window.customCards = window.customCards || [];
window.customCards.push({
  type: "lutron-caseta-fan-control-entity-row",
  name: "lutron caseta fan control entity row",
  description: "A plugin to display your Lutron Caseta fan controls in a button row.",
  preview: false,
});

class CustomFanRow extends Polymer.Element {

	static get template() {
		return Polymer.html`
			<style is="custom-style" include="iron-flex iron-flex-alignment"></style>
			<style>
				:host {
					line-height: inherit;
				}
				.speed {
					margin-left: 2px;
					margin-right: 2px;
					background-color: #759aaa;
					border: 1px solid lightgrey; 
					border-radius: 4px;
					font-size: 10px !important;
					color: inherit;
					text-align: center;
					float: right !important;
					padding: 1px;
					cursor: pointer;
				}
			</style>
			<hui-generic-entity-row hass="[[hass]]" config="[[_config]]">
				<div class='horizontal justified layout' on-click="stopPropagation">
					<button
						class='speed'
						style='[[_leftColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]]'
						toggles name="[[_leftName]]"
						on-click='setSpeed'
						disabled='[[_leftState]]'>[[_leftText]]</button>
					<button
						class='speed'
						style='[[_midLeftColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]];[[_hideMidLeft]]'
						toggles name="[[_midLeftName]]"
						on-click='setSpeed'
						disabled='[[_midLeftState]]'>[[_midLeftText]]</button>
					<button
						class='speed'
						style='[[_midColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]];[[_hideMid]]'
						toggles name="[[_midName]]"
						on-click='setSpeed'
						disabled='[[_midState]]'>[[_midText]]</button>
					<button
						class='speed'
						style='[[_midRightColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]];[[_hideMidRight]]'
						toggles name="[[_midRightName]]"
						on-click='setSpeed'
						disabled='[[_midRightState]]'>[[_midRightText]]</button>
					<button
						class='speed'
						style='[[_rightColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]]'
						toggles name="[[_rightName]]"
						on-click='setSpeed'
						disabled='[[_rightState]]'>[[_rightText]]</button>
				</div>
			</hui-generic-entity-row>
        `;
    }

	static get properties() {
		return {
			hass: {
				type: Object,
				observer: 'hassChanged'
			},
			_config: Object,
			_stateObj: Object,
			_width: String,
			_height: String,
			_leftColor: String,
			_midLeftColor: String,
			_midRightColor: String,
			_rightColor: String,
			_leftText: String,
			_midLeftText: String,
			_midRightText: String,
			_rightText: String,
			_leftName: String,
			_midLeftName: String,
			_midRightName: String,
			_rightName: String,
			_hideMidLeft: String,
			_hideMid: String,
			_hideMidRight: String,
			_leftState: Boolean,
			_midLeftState: Boolean,
			_midRightState: Boolean,
			_rightState: Boolean,

		}
	}

	setConfig(config) {
		this._config = config;
		
		this._config = {
			customTheme: false,
			sendStateWithSpeed: false,
			reverseButtons: false,
			isTwoSpeedFan: false,
			width: '30px',
			height: '30px',
			isOffColor: '#f44c09',
			isOnLowColor: '#43A047',
			isOnMedColor: '#43A047',
			isOnHiColor: '#43A047',
			buttonInactiveColor: '#759aaa',
			customOffText: 'OFF',
			customLowText: 'LOW',
			customMedText: 'MED',
			customMedHiText: 'M-HI',
			customHiText: 'HIGH',
			...config
			};
	}

	hassChanged(hass) {

		const config = this._config;
		const stateObj = hass.states[config.entity];
		const custTheme = config.customTheme;
		const sendStateWithSpeed = config.sendStateWithSpeed;
		const revButtons = config.reverseButtons;
		const twoSpdFan = config.isTwoSpeedFan;
		const buttonWidth = config.width;
		const buttonHeight = config.height;
		const custOnLowClr = config.isOnLowColor;
		const custOnMedClr = config.isOnMedColor;
		const custOnMedHiClr = config.isOnMedHiColor;
		const custOnHiClr = config.isOnHiColor;
		const custOffSpdClr = config.buttonInactiveColor;
		const custOffClr = config.isOffColor;
		const custOffTxt = config.customOffText;
		const custLowTxt = config.customLowText;
		const custMedTxt = config.customMedText;
		const custMedHiTxt = config.customMedHiText;
		const custHiTxt = config.customHiText;
		
		let speed;
			if (stateObj && stateObj.attributes) {
				speed = stateObj.attributes.percentage || '0';
			}
		
		let low;
		let med;
		let high;
		let medium_high;
		let offstate;
		
		if (stateObj && stateObj.attributes) {
			if (stateObj.state == 'on' && stateObj.attributes.percentage == '25') {
				low = 'on';
			} else if (stateObj.state == 'on' && stateObj.attributes.percentage == '50') {
				med = 'on';
			} else if (stateObj.state == 'on' && stateObj.attributes.percentage == '100') {
				high = 'on';
			} else if (stateObj.state == 'on' && stateObj.attributes.percentage == '75') {
					medium_high = 'on';
			} else {
				offstate = 'on';
			}
		}
		
		let lowcolor;
		let medcolor;
		let hicolor;
		let offcolor;
		let medhicolor;
		if (custTheme) {
			if (low == 'on') {
				lowcolor = 'background-color:' + custOnLowClr;
			} else {
				lowcolor = 'background-color:' + custOffSpdClr;
			}

			if (med == 'on') {
				medcolor = 'background-color:'  + custOnMedClr;
			} else {
				medcolor = 'background-color:' + custOffSpdClr;
			}
			
			if (high == 'on') {
				hicolor = 'background-color:'  + custOnHiClr;
			} else {
				hicolor = 'background-color:' + custOffSpdClr;
			}
			if (medium_high == 'on') {
				medhicolor = 'background-color:'  + custOnMedHiClr;
			} else {
				medhicolor = 'background-color:' + custOffSpdClr;
			}		
			if (offstate == 'on') {
				offcolor = 'background-color:'  + custOffClr;
			} else {
				offcolor = 'background-color:' + custOffSpdClr;
			}

		} else {

			if (low == 'on') {
				lowcolor = 'background-color: var(--primary-color)';
			} else {
				lowcolor = 'background-color: var(--disabled-text-color)';
			}
		
			if (med == 'on') {
				medcolor = 'background-color: var(--primary-color)';
			} else {
				medcolor = 'background-color: var(--disabled-text-color)';
			}
		
			if (high == 'on') {
				hicolor = 'background-color: var(--primary-color)';
			} else {
				hicolor = 'background-color: var(--disabled-text-color)';
			}
			if (medium_high == 'on') {
				medhicolor = 'background-color: var(--primary-color)';
			} else {
				medhicolor = 'background-color: var(--disabled-text-color)';
			}
			if (offstate == 'on') {
				offcolor = 'background-color: var(--primary-color)';
			} else {
				offcolor = 'background-color: var(--disabled-text-color)';
			}
		}
	
		let offtext = custOffTxt;
		let lowtext = custLowTxt;
		let medtext = custMedTxt;
		let hitext = custHiTxt;
		let medhitext = custMedHiTxt;

		
		let buttonwidth = buttonWidth;
		let buttonheight = buttonHeight;
		
		let hiname = '100';
		let medname = '50';
		let medhiname = '75';
		let lowname = '25';
		let offname = '0';
		
		let hidemedium = 'display:block';
		let nohide = 'display:block';
		
		if (twoSpdFan) {
			hidemedium = 'display:none';
		} else {
			hidemedium = 'display:block';
		}
		
			
		if (revButtons) {
			this.setProperties({
				_stateObj: stateObj,
				_leftState: offstate == 'on',
				_midLeftState: low == 'on',
				_midState: med == 'on',
				_midRightState: medium_high == 'on',
				_rightState: high == 'on',
				_width: buttonwidth,
				_height: buttonheight,
				_leftColor: offcolor,
				_midLeftColor: lowcolor,
				_midColor: medcolor,
				_midRightColor: medhicolor,
				_rightColor: hicolor,
				_leftText: offtext,
				_midLeftText: lowtext,
				_midText: medtext,
				_midRightText: medhitext,
				_rightText: hitext,
				_leftName: offname,
				_midLeftName: lowname,
				_midName: medname,
				_midRightName: medhiname,
				_rightName: hiname,
				_hideMidLeft: nohide,
				_hideMidRight: hidemedium,
				_hideMid: hidemedium
			});
		} else {
			this.setProperties({
				_stateObj: stateObj,
				_leftState: high == 'on',
				_midLeftState: medium_high == 'on',
				_midState: med == 'on',
				_midRightState: low == 'on',
				_rightState: offstate == 'on',
				_width: buttonwidth,
				_height: buttonheight,
				_leftColor: hicolor,
				_midLeftColor: medhicolor,
				_midColor: medcolor,
				_midRightColor: lowcolor,
				_rightColor: offcolor,
				_leftText: hitext,
				_midLeftText: medhitext,
				_midText: medtext,
				_midRightText: lowtext,
				_rightText: offtext,
				_leftName: hiname,
				_midLeftName: medhiname,
				_midName: medname,
				_midRightName: lowname,
				_rightName: offname,
				_hideMid: hidemedium,
				_hideMidRight: nohide,
				_hideMidLeft: hidemedium,
			});
		}
    }

	stopPropagation(e) {
		e.stopPropagation();
	}

	setSpeed(e) {
		const speed = e.currentTarget.getAttribute('name');
		if( speed == '0' ){
			this.hass.callService('fan', 'turn_off', {entity_id: this._config.entity});
			this.hass.callService('fan', 'set_percentage', {entity_id: this._config.entity, percentage: speed});
		} else {
			if(this._config.sendStateWithSpeed){
			this.hass.callService('fan', 'turn_on', {entity_id: this._config.entity});
			}
			this.hass.callService('fan', 'set_percentage', {entity_id: this._config.entity, percentage: speed});
		}
	}
}
	
customElements.define('lutron-caseta-fan-control-entity-row', CustomFanRow);
