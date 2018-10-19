import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArticleListItem from '../ArticleListItem';
import EpisodeListItem from '../EpisodeListItem';

class TagFeeds extends React.Component {
	render() {
		const feeds = [...this.props.tag.episode, ...this.props.tag.article].map(
			(feed) => {
				if (feed.type === 'articles')
					feed.pinID = this.props.pinnedArticles[feed._id]
						? this.props.pinnedArticles[feed._id]._id
						: '';
				else
					feed.pinID = this.props.pinnedEpisodes[feed._id]
						? this.props.pinnedEpisodes[feed._id]._id
						: '';

				return feed;
			},
		);

		//Todo Sort feed

		return (
			<div className="list content">
				{feeds.length ? (
					feeds.map(
						(feed) =>
							feed.type === 'articles' ? (
								<ArticleListItem key={feed._id} {...feed} />
							) : (
								<EpisodeListItem key={feed._id} {...feed} />
							),
					)
				) : (
					<div className="end">
						<p>You haven&#39;t tagged any article or episode yet :(</p>
					</div>
				)}
			</div>
		);
	}
}

TagFeeds.defaultProps = {
	sortBy: 'desc',
};

TagFeeds.propTypes = {
	dispatch: PropTypes.func.isRequired,
	pinnedArticles: PropTypes.shape({}),
	pinnedEpisodes: PropTypes.shape({}),
	sortBy: PropTypes.string,
	tag: PropTypes.shape({
		_id: PropTypes.string,
		article: PropTypes.array,
		episode: PropTypes.array,
	}),
};

const mapStateToProps = (state) => ({
	pinnedArticles: state.pinnedArticles || {},
	pinnedEpisodes: state.pinnedEpisodes || {},
});

export default connect(mapStateToProps)(TagFeeds);
