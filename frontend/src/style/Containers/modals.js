import styled from 'styled-components';

export const ModalContainer = styled.div`
	display: block;
	position: fixed;
	z-index: 999;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
	overflow-y: hidden;
`;

export const ModalPostWindow = styled.div`
	display: grid;
	grid-template-columns: 17.3% 1fr 5.4%;
	grid-template-rows: repeat(2, 1fr) 24.8%;
	z-index: 2;
	margin-left: 144px;
	margin-top: 202px;
	background-color: white;
	width: 560px;
	height: 406px;

	.user-image {
		height: 60px;
		width: 60px;
		border-radius: 50%;
		margin-top: 40px;
		margin-left: 30px;
	}

	.new-post-contents {
		grid-row: 1 / 3;
		grid-column: 2;
		width: 100%;
		max-width: 432px;
		padding-top: 44px;
		padding-left: 30px;
		resize: none;
		border-top: 0px;
		border-right: 0px;
		border-bottom: 0px;
		border-left: 0px;
	}

	.user-button {
		height: 14px;
		width: 14px;
		color: black;
		background-color: white;
		border-top: 0px;
		border-right: 0px;
		border-bottom: 0px;
		border-left: 0px;
		font-size: 20px;
		justify-self: center;
		margin-top: 7px;
		opacity: 0.5;

		:hover {
			cursor: pointer;
		}
	}

	.user-send-button {
		grid-row-start: 3;
		grid-column-start: 2;
		justify-self: flex-end;
		align-self: center;
	}

	.upload-image {
		grid-row-start: 3;
		grid-column-start: 1;
		height: 22px;
		width: 22px;
		justify-self: center;
		align-self: center;
	}

	.attach-file-image {
		grid-row-start: 3;
		grid-column-start: 2;
		height: 22px;
		width: 22px;
		align-self: center;
	}
`;

export const ModalPost = styled.div`
	height: 560px;
	width: 900px;
	background-color: white;
	background: #ffffff;
	box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05),
		0px 0px 1px rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	position: absolute;
	width: 900px;
	height: 560px;
	margin-left: 258px;
	margin-top: 100px;
	display: grid;
	grid-template-columns: 1fr 340px 30px;

	.modal-post-content {
		display: grid;
		grid-template-rows: 94px 1fr 50px 84px;

		.modal-post-header {
			display: grid;
			grid-template-columns: 74px 120px 1fr;
			align-items: center;
			height: 94px;

			.user-image {
				height: 40px;
				width: 40px;
				margin-left: 30px;
				object-fit: center;
				border-radius: 50%;
			}
		}

		.modal-post-header-text-container {
			display: grid;
			margin-left: 16px;
			font-size: 14px;

			.post-header-username {
				width: 120px;
				height: 16px;
				color: #000000;
			}

			.post-header-time-difference {
				margin-top: 7px;
				width: 100px;
				height: 16px;
				opacity: 0.5;
				color: #000000;
			}
		}
		.modal-post-text {
			width: 100%;
			max-width: 432px;
			padding-top: 44px;
			padding-left: 30px;
			resize: none;
			border-top: 0px;
			border-right: 0px;
			border-bottom: 0px;
			border-left: 0px;
			background-color: white;
		}

		.modal-post-submit {
			width: 80px;
			height: 50px;
			border-radius: 30px;
			background-image: linear-gradient(102deg, #c468ff, #6e91f6);
			font-size: 12px;
			letter-spacing: 1px;
			color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 0px;
			border-right: 0px;
			border-bottom: 0px;
			border-left: 0px;
			justify-self: center;

			:hover {
				cursor: pointer;
			}
		}

		.modal-post-likes {
			justify-self: flex-end;
			width: 100px;
			height: 16px;
			opacity: 0.5;
			font-size: 14px;
			text-align: right;
			color: #000000;
		}

		.modal-post-footer {
			display: grid;
			grid-template-columns: 96px 117px 1fr;
			align-items: center;
			height: 85px;

			.like-logo {
				justify-self: flex-end;
				display: flex;
				align-items: center;
				:hover {
					cursor: pointer;
				}
			}

			.like-image {
				width: 20px;
				height: 18.4px;
				opacity: 0.3;
			}

			.like-logo-text {
				width: 26px;
				height: 16px;
				font-size: 14px;
				color: #000000;
				margin-left: 18px;
			}

			.share-logo {
				justify-self: flex-end;
				display: flex;
				align-items: center;
			}

			.share-image {
				width: 24px;
				height: 24px;
				opacity: 0.3;
			}

			.share-logo-text {
				width: 37px;
				height: 16px;
				font-size: 14px;
				color: #000000;
				margin-left: 17px;
			}
		}
	}
	.close-button {
		height: 14px;
		width: 14px;
		color: black;
		background-color: white;
		border-top: 0px;
		border-right: 0px;
		border-bottom: 0px;
		border-left: 0px;
		font-size: 20px;
		opacity: 0.5;
		align-self: flex-start;
		justify-self: center;
		margin-top: 8px;

		:hover {
			cursor: pointer;
		}
	}
`;
