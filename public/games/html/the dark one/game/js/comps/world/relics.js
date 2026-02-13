class Relic extends Phaser.Group {
    constructor(spritekey,name,type,value,price,location,have=false) {
        super(game);
        //
        this.spritekey = spritekey;
        this.name = name;
        this.type = type;
        this.value = value;
        this.price = price;
        this.location = location;
        this.have = have;
    }
}

