import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({ authRoute }) => {
	//Ở đây chúng ta sẽ nhập khẩu authLoading, isAuthenticated từ bên File AuthContext
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	let body

	if (authLoading)
	//đang gửi qua Server để xem xét với authLoading
		body = (
			<div className='d-flex justify-content-center mt-2'>
				<Spinner animation='border' variant='info' />
			</div>
			//trong khi đnag xét thì trả ra Spinner (giao diện)
		)
	else if (isAuthenticated) return <Redirect to='/dashboard' />
	//Ở đoạn này server sẽ xem rằng isAuthenticated trong payload nó trả ra thế nào
	//True hay False thì nó sẽ response lại ở đây là return với Redirect là'to='/dashboard'' ra còn sai thì tiếp tục ở dóng code dưới
	else
		body = (
			<>
				{authRoute === 'login' && <LoginForm />}
				{authRoute === 'register' && <RegisterForm />}
			</>
		)

	return (
		<div className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1>LearnIt</h1>
					<h4>Keep track of what you are learning</h4>
					{body}
				</div>
			</div>
		</div>
	)
}

export default Auth
