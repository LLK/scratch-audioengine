const Effect = require('./Effect');

/**
 * Affect the volume of an effect chain.
 */
class VolumeEffect extends Effect {
    /**
     * Default value to set the Effect to when constructed and when clear'ed.
     * @const {number}
     */
    get DEFAULT_VALUE () {
        return 100;
    }

    get name () {
        return 'volume';
    }

    /**
     * Initialize the Effect.
     * Effects start out uninitialized. Then initialize when they are first set
     * with some value.
     * @throws {Error} throws when left unimplemented
     */
    initialize () {
        this.inputNode = this.audioEngine.audioContext.createGain();
        this.outputNode = this.inputNode;

        this.initialized = true;
    }

    /**
     * Set the effects value.
     * @private
     * @param {number} value - new value to set effect to
     */
    _set (value) {
        this.value = value;
        // A gain of 1 is normal. Scale down scratch's volume value. Apply the
        // change over a tiny period of time.
        this.outputNode.gain.setTargetAtTime(
            value / 100,
            this.audioEngine.audioContext.currentTime,
            this.audioEngine.DECAY_TIME
        );
    }

    /**
     * Clean up and disconnect audio nodes.
     */
    dispose () {
        if (!this.initialized) {
            return;
        }

        this.outputNode.disconnect();

        this.inputNode = null;
        this.outputNode = null;
        this.target = null;

        this.initialized = false;
    }
}

module.exports = VolumeEffect;
