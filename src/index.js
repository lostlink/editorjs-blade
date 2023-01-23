/**
 * Build styles
 */
import './index.css';

import { IconHtml } from '@codexteam/icons';

/**
 * Blade Block for the Editor.js.
 *
 * @author Nuno Souto (nsouto@lostlink.net)
 * @copyright LostLink 2023
 * @license The MIT License (MIT)
 */

/**
 *
 */
export default class BladeTool {
    /**
     * Notify core that read-only mode is supported
     *
     * @returns {boolean}
     */
    static get isReadOnlySupported() {
        return true;
    }

    /**
     * Should this tool be displayed at the Editor's Toolbox
     *
     * @returns {boolean}
     * @public
     */
    static get displayInToolbox() {
        return true;
    }

    /**
     * Allow to press Enter inside the RawTool textarea
     *
     * @returns {boolean}
     * @public
     */
    static get enableLineBreaks() {
        return true;
    }

    /**
     * Get Tool toolbox settings
     * icon - Tool icon's SVG
     * title - title to show in toolbox
     *
     * @returns {{icon: string, title: string}}
     */
    static get toolbox() {
        return {
            icon: IconHtml,
            title: 'Blade HTML',
        };
    }

    /**
     * @typedef {object} BladeData — plugin saved data
     * @param {string} html - previously saved HTML code
     * @property
     */

    /**
     * Render plugin`s main Element and fill it with saved data
     *
     * @param {BladeData} data — previously saved HTML data
     * @param {object} config - user config for Tool
     * @param {object} api - CodeX Editor API
     * @param {boolean} readOnly - read-only mode flag
     */
    constructor({ data, config, api, readOnly }) {
        this.api = api;
        this.readOnly = readOnly;

        this.placeholder = config.placeholder || BladeTool.DEFAULT_PLACEHOLDER;

        this.CSS = {
            baseClass: this.api.styles.block,
            input: this.api.styles.input,
            wrapper: 'ce-bladetool',
            textarea: 'ce-bladetool__textarea',
        };

        this.data = {
            html: data.html || '',
        };

        this.textarea = null;
        this.resizeDebounce = null;
    }

    /**
     * Return Tool's view
     *
     * @returns {HTMLDivElement} this.element - RawTool's wrapper
     * @public
     */
    render() {
        const wrapper = document.createElement('div');
        const renderingTime = 100;

        this.textarea = document.createElement('textarea');

        wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);

        this.textarea.classList.add(this.CSS.textarea, this.CSS.input);
        this.textarea.textContent = this.data.html;
        this.textarea.placeholder = this.placeholder;

        if (this.readOnly) {
            this.textarea.disabled = true;
        } else {
            this.textarea.addEventListener('input', () => {
                this.onInput();
            });
        }

        wrapper.appendChild(this.textarea);

        setTimeout(() => {
            this.resize();
        }, renderingTime);

        return wrapper;
    }

    /**
     * Extract Tool's data from the view
     *
     * @param {HTMLDivElement} bladeToolsWrapper - BladeTool's wrapper, containing textarea with raw HTML code
     * @returns {BladeData} - raw HTML code
     * @public
     */
    save(bladeToolsWrapper) {
        return {
            html: bladeToolsWrapper.querySelector('textarea').value,
        };
    }

    /**
     * Default placeholder for RawTool's textarea
     *
     * @public
     * @returns {string}
     */
    static get DEFAULT_PLACEHOLDER() {
        return 'Enter Blade code';
    }

    /**
     * Automatic sanitize config
     */
    static get sanitize() {
        return {
            html: true, // Allow HTML tags
        };
    }

    /**
     * Textarea change event
     *
     * @returns {void}
     */
    onInput() {
        if (this.resizeDebounce) {
            clearTimeout(this.resizeDebounce);
        }

        this.resizeDebounce = setTimeout(() => {
            this.resize();
        }, 200);
    }

    /**
     * Resize textarea to fit whole height
     *
     * @returns {void}
     */
    resize() {
        this.textarea.style.height = 'auto';
        this.textarea.style.height = this.textarea.scrollHeight + 'px';
    }
}
