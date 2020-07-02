import React from 'react';
import PostFooter from './postFooter';
import PostHeader from './postHeader';
import {IndividualPostContainer} from '../../../style/Containers/posts';
import {connect} from 'react-redux';

const Post = (props) => {
	
	return (
				<IndividualPostContainer>
				<PostHeader
					user={props.post.user}
					created={props.post.created}
					id={props.post.id}
					index={props.index}
					post={props.post}
				/>
				<div className='post-content'>
					<p onClick={props.onClickHandler} id={props.post.id} >{props.post.content}</p>
				</div>
				<PostFooter
					likes={props.post.amount_of_likes}
					post={props.post}
				/>
			</IndividualPostContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		togglePostModal: state.postPageReducer.togglePostModal,
	};
};

export default connect(mapStateToProps)(Post);
