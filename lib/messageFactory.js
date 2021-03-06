/* 
 * messageFactory.js, ESB Message factory
 * 
 * (C) 2018 TekMonks. All rights reserved.
 */

const utils = require(CONSTANTS.LIBDIR+"/utils.js");

class Message {
    constructor() {
        this.timestamp = utils.getTimeStamp();
        this.routesDone = [];
        this.content = {};
        this.env = {};
        this.isGCEligible = true;
    }
    addRouteDone(routeName) {this.routesDone.push(routeName); this.isGCEligible = true;}
    addRouteError(routeName) {this.routesDone.push(`${routeName}.error`); this.isGCEligible = true;}
    setGCEligible(eligible) {this.isGCEligible = eligible}
    clone() {
        let clone = new Message();
        clone.timestamp = this.timestamp;
        clone.routesDone = this.routesDone.slice(0);
        clone.content = Object.assign(clone.content, this.content);
        clone.env = Object.assign(clone.env, this.env);

        return clone;
    }
};

exports.newMessage = _ => {return new Message();}