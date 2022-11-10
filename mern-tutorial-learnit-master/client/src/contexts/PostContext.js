import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'

//chứa các giá trị được lưu trong Constant và nó sẽ là các State để được quản lí trong postReducer.js
import {
	apiUrl,
	POSTS_LOADED_FAIL,
	POSTS_LOADED_SUCCESS,
	ADD_POST,
	DELETE_POST,
	UPDATE_POST,
	FIND_POST
} from './constants'


import axios from 'axios'



export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
	// State
	const [postState, dispatch] = useReducer(postReducer, {
		post: null,
		posts: [],
		postsLoading: true
	})
	//ở đây chúng ta sẽ false cho những thứ mà người chưa đụng đến ta can thiệp nó
	const [showAddPostModal, setShowAddPostModal] = useState(false)
	const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all posts
	const getPosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/posts`)
			//như ở bên auth thì bên đây chúng ta cũng sẽ phải connect với server.
			if (response.data.success) {
				//nếu như mà giá trị trả về từ server -> client mà success thì dispatch với giá đó
				//payload nó sẽ chứa các posts mà từ server trả về 
				dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
			}
		} catch (error) {
			dispatch({ type: POSTS_LOADED_FAIL })
		}
	}

	// Add post
	const addPost = async newPost => {
		try {
			//tương tự như trên, connect với server
			const response = await axios.post(`${apiUrl}/posts`, newPost)

			//nếu như thành công thì trả về payload: response.data.post 
			if (response.data.success) {
				dispatch({ type: ADD_POST, payload: response.data.post })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete post
	const deletePost = async postId => {
		try {
			//connect và kèm theo ID
			const response = await axios.delete(`${apiUrl}/posts/${postId}`)
			if (response.data.success)
				dispatch({ type: DELETE_POST, payload: postId })
				//filter tra về những thứ con lại
		} catch (error) {
			console.log(error)
		}
	}

	// Find post when user is updating post
	const findPost = postId => {
		const post = postState.posts.find(post => post._id === postId)
		dispatch({ type: FIND_POST, payload: post })
	}

	// Update post
	const updatePost = async updatedPost => {
		try {
			const response = await axios.put(
				`${apiUrl}/posts/${updatedPost._id}`,
				updatedPost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE_POST, payload: response.data.post })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Post context data
	const postContextData = {
		postState,
		getPosts,
		showAddPostModal,
		setShowAddPostModal,
		showUpdatePostModal,
		setShowUpdatePostModal,
		addPost,
		showToast,
		setShowToast,
		deletePost,
		findPost,
		updatePost
	}

	return (
		<PostContext.Provider value={postContextData}>
			{children}
		</PostContext.Provider>
	)
}

export default PostContextProvider
