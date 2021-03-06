/**
 * Agate styled button components and behaviors.
 *
 * @example
 * <Button>Hello Enact!</Button>
 *
 * @module agate/Button
 * @exports Button
 * @exports ButtonBase
 * @exports ButtonDecorator
 */

import kind from '@enact/core/kind';
import {cap} from '@enact/core/util';
// import EnactPropTypes from '@enact/core/internal/prop-types';
import Spottable from '@enact/spotlight/Spottable';
import {ButtonBase as UiButtonBase, ButtonDecorator as UiButtonDecorator} from '@enact/ui/Button';
// import ComponentOverride from '@enact/ui/ComponentOverride';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';

import {IconBase} from '../Icon';
// import {MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './Button.module.less';

// Make a basic Icon in case we need it later. This cuts `Pure` out of icon for a small gain.
const Icon = Skinnable(IconBase);

/**
 * A button component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Button]{@link agate/Button.Button}.
 *
 * @class ButtonBase
 * @memberof agate/Button
 * @extends ui/Button.ButtonBase
 * @omit minWidth
 * @ui
 * @public
 */
const ButtonBase = kind({
	name: 'Button',

	propTypes: /** @lends agate/Button.ButtonBase.prototype */ {
		/**
		 * Animate when this component renders.
		 *
		 * @type {Boolean}
		 * @public
		 */
		animateOnRender: PropTypes.bool,

		/**
		 * The delay before the button is animated, in milliseconds.
		 *
		 * @type {Number}
		 * @public
		 */
		animationDelay: PropTypes.number,

		/**
		 * The background opacity of this button.
		 *
		 * Valid values are:
		 * * `'opaque'`,
		 * * `'lightOpaque'`, and
		 * * `'transparent'`.
		 *
		 * @type {('opaque'|'lightOpaque'|'transparent')}
		 * @public
		 */
		backgroundOpacity: PropTypes.oneOf(['opaque', 'lightOpaque', 'transparent']),

		/**
		 * A small message overlaid onto the button.
		 *
		 * @type {Number|String}
		 * @public
		 */
		badge: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

		/**
		 * A custom color for the badge element.
		 *
		 * This prop is only visible if the `badge` prop is also set.
		 *
		 * @type {String}
		 * @public
		 */
		badgeColor: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `button` - The root class name
		 * * `bg` - The background node of the button
		 * * `selected` - Applied to a `selected` button
		 * * `small` - Applied to a button specifying a `size` of `'small'`
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Additional DOM nodes which may be necessary for decorating the Button.
		 *
		 * @type {Node}
		 * @private
		 */
		decoration: PropTypes.node,

		/**
		 * Provides a way to call special interface attention to this button. It will be "featured"
		 * in some way by the theme's visual rules.
		 *
		 * @type {Boolean}
		 * @public
		 */
		highlighted: PropTypes.bool,

		// /**
		//  * The component used to render the icon.
		//  *
		//  * @type {Component}
		//  * @public
		//  */
		// iconComponent: EnactPropTypes.component,

		/**
		 * The position of this button in relation to other buttons.
		 *
		 * To create a collection of buttons that appear as one entity: buttons that butt up against
		 * each other. Specify where the button is in the arrangement: 'left', 'center', or 'right'.
		 * This prop is not recommended for use on a lonely button with no other buttons nearby.
		 * Not specifying this optional prop leaves the button behaving normally.
		 *
		 * @type {('left'|'center'|'right')}
		 * @public
		 */
		joinedPosition: PropTypes.oneOf(['left', 'center', 'right']),

		/**
		 * Provides a way to call special interface attention to this button. It will be "featured"
		 * in some way by the theme's visual rules.
		 *
		 * @type {Boolean}
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * The size of the button.
		 *
		 * @type {('smallest'|'small'|'large'|'huge')}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.oneOf(['smallest', 'small', 'large', 'huge']),

		// /**
		//  * The amount of sprite "cells" in the src image of the `icon` being supplied. This prop has no effect without `icon`.
		//  *
		//  * @type {Number}
		//  * @public
		//  */
		// spriteCount: PropTypes.number,

		/**
		 * The button type.
		 *
		 * Grid buttons are intended to be grouped with other related buttons.
		 *
		 * @type {('grid'|'standard')}
		 * @default 'standard'
		 * @public
		 */
		type: PropTypes.oneOf(['grid', 'standard'])
	},

	defaultProps: {
		backgroundOpacity: 'opaque',
		iconComponent: Icon,
		size: 'large',
		type: 'standard'
	},

	styles: {
		css: componentCss,
		publicClassNames: true
	},

	computed: {
		className: ({animateOnRender, backgroundOpacity, highlighted, joinedPosition, selected, type, size, styler}) => styler.append(
			backgroundOpacity,
			size,
			type,
			(joinedPosition && 'joined' + cap(joinedPosition)),  // If `joinedPosition` is present, prepend the word "joined" to the variable, so the classes are clearer.
			{
				animateOnRender,
				highlighted,
				selected
			}
		),
		decoration: ({badge, css, decoration}) => {
			if (!badge) return decoration;
			return (
				<React.Fragment>
					<div className={css.badge}>{badge}</div>
					{decoration}
				</React.Fragment>
			);
		},
		// Temporary reversion until > alpha.11
		// iconComponent: ({iconComponent, spriteCount}) => {
		// 	// Don't burden basic HTML elements with the spriteCount prop (or other Icon-specific props)
		// 	if (typeof iconComponent === 'string') return iconComponent;

		// 	return (
		// 		<ComponentOverride
		// 			component={iconComponent}
		// 			spriteCount={spriteCount}
		// 		/>
		// 	);
		// },
		style: ({animationDelay, badgeColor, style}) => ({
			...style,
			'--agate-button-animation-delay': animationDelay,
			'--agate-button-badge-bg-color': badgeColor
		}),
		minWidth: ({children}) => (React.Children.count(children) === 0 || children === '')
	},

	render: ({css, ...rest}) => {
		delete rest.animateOnRender;
		delete rest.animationDelay;
		delete rest.backgroundOpacity;
		delete rest.badge;
		delete rest.highlighted;
		delete rest.joinedPosition;
		delete rest.selected;
		// eslint-disable-next-line enact/prop-types
		delete rest.spriteCount;
		delete rest.type;

		return UiButtonBase.inline({
			'data-webos-voice-intent': 'Select',
			...rest,
			css
		});
	}
});

/**
 * Applies Agate specific behaviors to [Button]{@link agate/Button.ButtonBase} components.
 *
 * @hoc
 * @memberof agate/Button
 * @mixes ui/Button.ButtonDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ButtonDecorator = compose(
	Pure,
	// MarqueeDecorator({className: componentCss.marquee}),
	UiButtonDecorator,
	Spottable,
	Skinnable
);

/**
 * A button component, ready to use in Agate applications.
 *
 * Usage:
 * ```
 * <Button
 * 	backgroundOpacity="translucent"
 * 	color="blue"
 * >
 * 	Press me!
 * </Button>
 * ```
 *
 * @class Button
 * @memberof agate/Button
 * @extends agate/Button.ButtonBase
 * @mixes agate/Button.ButtonDecorator
 * @ui
 * @public
 */
const Button = ButtonDecorator(ButtonBase);

export default Button;
export {
	Button,
	ButtonBase,
	ButtonDecorator
};
