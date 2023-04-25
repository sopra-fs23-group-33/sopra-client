class Powerup {
    constructor(data = {}) {
        this.powerupID = null;
        this.ownerID = null;
        this.ownerName = null;
        this.description = null;
        this.name = null;
        this.active = null;
        this.powerupType = null;
        Object.assign(this, data);
    }
}
