import React from 'react';
import {NavLink} from 'react-router-dom';
import searchIcon from '../../../assets/svgs/search_icon.svg';
import {
	SearchBarContainer,
	SearchBarLeftContainer,
	SearchInputContainer,
	SearchBarRightContainer,
} from '../../../style/Containers/searchBar';

const Search = () => {
	return (
		<SearchBarContainer>
			<SearchBarLeftContainer>
				<SearchInputContainer>
					<input
						className='search-image'
						type='image'
						src={searchIcon}
						alt='search logo'
					/>
					<input
						className='search-image-text'
						type='text'
						placeholder='Search posts...'
					/>
				</SearchInputContainer>
			</SearchBarLeftContainer>
			<SearchBarRightContainer>
				<div></div>
				<div className='liked-container'>
					<NavLink className='liked-link' to='/feed/liked'>
						Liked
					</NavLink>
				</div>
				<div className='friends-container'>
					<NavLink className='friends-link' to='/feed/friends'>
						Friends
					</NavLink>
				</div>
				<div className='follow-container'>
					<NavLink className='follow-link' to='/feed/follow'>
						Follow
					</NavLink>
				</div>
			</SearchBarRightContainer>
		</SearchBarContainer>
	);
};

export default Search;
