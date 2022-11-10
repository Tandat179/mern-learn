import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'

const SinglePost = ({ post: { _id, status, title, description, url } }) => (
	<Card
		className='shadow'
		border={
			status === 'LEARNED'
				? 'success'
				: status === 'LEARNING'
				? 'warning'
				: 'danger'
		}
	>	
		<Card.Body>
			<Card.Title>
				<Row>
					<Col>
				{/* nhận tên tiêu đề */}
						<p className='post-title'>{title}</p>
						<Badge
							pill
							variant={
								//nhận status của title
								status === 'LEARNED'
									? 'success'
									: status === 'LEARNING'
									? 'warning'
									: 'danger'
							}
						>
							{status}
						</Badge>
					</Col>
					{/* Các nút thao tác với khóa học */}
					<Col className='text-right'>
						
						<ActionButtons url={url} _id={_id} />
					</Col>
				</Row>
			</Card.Title>
			{/* Trả description cho bài post */}
			<Card.Text>{description}</Card.Text>
		</Card.Body>
	</Card>
)

export default SinglePost
