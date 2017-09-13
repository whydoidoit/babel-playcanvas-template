//See reference project https://playcanvas.com/project/504134/overview/test-es6

import {V} from 'playcanvas-working-vectors';
import delay from 'playcanvas-delay'
import timeout from 'playcanvas-timeout'

const Example = pc.createScript('example');
Example.attributes.set({

    message: pc.attr.string.default("Default Message")

});

//Extended construction function called even if not enabled
Example.prototype.construct = function () {
    console.log("constructed")
    this.startLogging = false
    timeout(() => this.entity.enabled = true, 1000)
}

//Support for async functions
Example.prototype.initialize = async function() {
    console.log("Starting", this.startLogging)
    await delay(1000)
    console.log("Delayed")
    await delay(20000)
    this.startLogging = true
}

Example.prototype.update = function (dt) {
    if (this.startLogging) console.log(this.message, dt, V(this.entity.getPosition()).scale(0.5).data);
};
