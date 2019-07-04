module.exports = {
    name: 'Человек Воин',
    id: 0,
    stats: {
        int: 21,
        srt: 40,
        con: 43,
        men: 25,
        dex: 30,
        wit: 11,
        pAtk: 4,
        critRate: 4,
        AtkType: 'FIST',
        pAtkSpd: 300,
        pDef: {
            chest: 31,
            legs: 18,
            head: 12,
            feet: 7,
            gloves: 8,
            underwear: 3,
            cloak: 1
        },
        mAtk: 6,
        mDef: {
            rear: 9,
            lear: 9,
            rFinger: 5,
            lFinger: 5,
            neck: 13
        },
        canPenetrate: 0,
        atkRange: 20,
        damRange: {
            verticalDirection: 0,
            horizontalDirection: 0,
            distance: 26,
            width: 120
        },
        rndDam: 10,
        moveSpd: {
            walk: 80,
            run: 115,
            slowSwim: 50,
            fastSwim: 50
        },
        breath: 100,
        sageFall: 250,
        collisionMale: {
            radius: 9.0,
            height: 23
        },
        collisionFemale: {
            radius: 8.0,
            height: 23.5
        }
    },
    lvlUpgain: {
        1: {
            hp: 80.0,
            mp: 30.0,
            cp: 32.0,
            hpRegen: 2.0,
            mpRegen: 0.9,
            cpRegen: 2.0
        },
        2: {
            hp: 91.83,
            mp: 35.46,
            cp: 36.732,
            hpRegen: 2.05,
            mpRegen: 0.9,
            cpRegen: 2.0
        }
    }
};
