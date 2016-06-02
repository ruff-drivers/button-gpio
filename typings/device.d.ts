import { RuffDevice } from 'ruff-driver';

export declare class Device extends RuffDevice {
    /**
     * Event `push`, will be emitted when the button is pushed.
     */
    on(event: 'push', listener: () => void): this;
    /**
     * Event `release`, will be emitted when the button is released.
     */
    on(event: 'release', listener: () => void): this;
}

export default Device;
