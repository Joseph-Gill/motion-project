import styled from 'styled-components';

export const FeedPageContainer = styled.div`
	width: 100%;
	min-height: 1440px;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 80px 60px 40px 1fr;
	background-color: #f8f8f9;
`;

export const FeedHeaderContainer = styled.div`
	display: grid;
	max-height: 80px;
	grid-template-columns: 1fr 1fr;
	background-color: white;
	box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.05), 0 0 1px 0 rgba(0, 0, 0, 0.2);
	position: relative;
`;

export const FeedHeaderLeftContainer = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 36.1% 20.9% 1fr;
`;

export const FeedHeaderRightContainer = styled.div`
	display: grid;
	grid-template-columns: 74.8% 11.3% 1fr;
	align-items: center;
`;
