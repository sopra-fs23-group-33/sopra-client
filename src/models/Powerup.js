class Powerup {
    constructor(data = {}) {
        this.ownerID = null;
        this.powerupID = null;
        this.description = null;
        this.active = null;
        this.powerupType = null;
        Object.assign(this, data);
    }
}

export default Powerup;