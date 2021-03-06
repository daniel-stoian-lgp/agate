/**
 * A Popup menu component.
 *
 * @example
 * <PopupMenu open title="Title">Hello!</PopupMenu>
 *
 * @module agate/PopupMenu
 * @exports PopupMenu
 * @exports PopupMenuBase
 * @exports PopupMenuDecorator
 */

import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';

import Skinnable from '../Skinnable';
import Heading from '../Heading';
import LabeledIconButton from '../LabeledIconButton';
import Scroller from '../Scroller';

import PopupState from '../Popup/PopupState';

import componentCss from './PopupMenu.module.less';

/**
 * The base popup menu component.
 *
 * @class PopupMenuBase
 * @memberof agate/PopupMenu
 * @ui
 * @public
 */
const PopupMenuBase = kind({
	name: 'PopupMenu',
	propTypes: /** @lends agate/PopupMenu.PopupMenuBase.prototype */ {
		closeButton: PropTypes.bool,
		css: PropTypes.object,
		noAnimation: PropTypes.bool,
		onClose: PropTypes.func,
		onHide: PropTypes.func,
		open: PropTypes.bool,
		orientation: PropTypes.oneOf(['horizontal']),
		title: PropTypes.string
	},

	defaultProps: {
		closeButton: false,
		noAnimation: false,
		open: false,
		orientation: 'horizontal'
	},

	styles: {
		css: componentCss,
		className: 'popupMenu'
	},

	computed: {
		className: ({orientation, styler}) => styler.append(orientation)
	},

	render: ({children, closeButton, css, noAnimation, onClose, onHide, open, orientation, title, ...rest}) => {
		return (
			<Transition
				noAnimation={noAnimation}
				visible={open}
				direction="down"
				duration="short"
				type="fade"
				className={css.popupTransitionContainer}
				onHide={onHide}
				css={css}
			>
				<Layout orientation="vertical" align="center center" {...rest}>
					<Cell className={css.title} shrink>
						<Heading size="title">{title}</Heading>
					</Cell>
					<Cell shrink className={css.body} align="stretch">
						<Scroller direction={orientation} horizontalScrollbar="hidden" verticalScrollbar="hidden">
							{children}
							{closeButton ? <LabeledIconButton
								inline
								icon="cancel"
								onClick={onClose}
								className={css.closeButton}
								size="huge"
								backgroundOpacity="lightOpaque"
							>cancel</LabeledIconButton> : null}
						</Scroller>
					</Cell>
				</Layout>
			</Transition>
		);
	}
});

/**
 * Applies Agate specific behaviors to [PopupMenuBase]{@link agate/PopupMenu.PopupMenuBase}.
 *
 * @hoc
 * @memberof agate/PopupMenu
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const PopupMenuDecorator = compose(
	Slottable({slots: ['title']}),
	Skinnable({prop: 'skin'}),
	PopupState
);

/**
 * A stateful component that renders a popup menu.
 *
 * @class PopupMenu
 * @memberof agate/PopupMenu
 * @ui
 * @public
 */
const PopupMenu = PopupMenuDecorator(PopupMenuBase);

export default PopupMenu;
export {
	PopupMenu,
	PopupMenuBase,
	PopupMenuDecorator
};
