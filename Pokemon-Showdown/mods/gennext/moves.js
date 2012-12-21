exports.BattleMovedex = {
	/******************************************************************
	Perfect accuracy moves:
	- base power increased 60 to 80 (physical) or 90 (special)

	Justification:
	- perfect accuracy is too underpowered to have such low base power
	- it's not even an adequate counter to accuracy boosting, which
	  is why the latter is banned

	Precedent:
	- Giga Drain and Drain Punch, similar 60 base power moves, have
	  been upgraded
	******************************************************************/
	aerialace: {
		inherit: true,
		basePower: 80
	},
	faintattack: {
		inherit: true,
		basePower: 80
	},
	shadowpunch: {
		inherit: true,
		basePower: 80
	},
	magnetbomb: {
		inherit: true,
		basePower: 80
	},
	magicalleaf: {
		inherit: true,
		basePower: 90
	},
	shockwave: {
		inherit: true,
		basePower: 90
	},
	swift: {
		inherit: true,
		basePower: 90
	},
	/******************************************************************
	HMs:
	- shouldn't suck (as much)

	Justification:
	- there are HMs that don't suck

	Precedent:
	- Dive! Technically, it was to be in-line with Dig, but still.
	******************************************************************/
	strength: {
		inherit: true,
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1
				}
			}
		}
	},
	cut: {
		inherit: true,
		secondary: {
			chance: 100,
			boosts: {
				def: -1
			}
		}
	},
	rocksmash: {
		inherit: true,
		basePower: 50,
		secondary: {
			chance: 100,
			boosts: {
				def: -1
			}
		}
	},
	/******************************************************************
	Weather moves:
	- have increased priority

	Justification:
	- several Rain abusers get Prankster, which makes Rain otherwise
	  overpowered
	******************************************************************/
	raindance: {
		inherit: true,
		priority: 1
	},
	sunnyday: {
		inherit: true,
		priority: 1
	},
	sandstorm: {
		inherit: true,
		priority: 1
	},
	hail: {
		inherit: true,
		priority: 1
	},
	/******************************************************************
	Substitute:
	- has precedence over Protect

	Justification:
	- Sub/Protect stalling is annoying
	******************************************************************/
	substitute: {
		inherit: true,
		effect: {
			onStart: function(target) {
				this.add('-start', target, 'Substitute');
				this.effectData.hp = Math.floor(target.maxhp/4);
				delete target.volatiles['partiallytrapped'];
			},
			onTryHitPriority: 2,
			onTryHit: function(target, source, move) {
				if (target === source) {
					this.debug('sub bypass: self hit');
					return;
				}
				if (move.category === 'Status') {
					var SubBlocked = {
						block:1, embargo:1, entrainment:1, gastroacid:1, healblock:1, healpulse:1, leechseed:1, lockon:1, meanlook:1, mindreader:1, nightmare:1, painsplit:1, psychoshift:1, simplebeam:1, skydrop:1, soak: 1, spiderweb:1, switcheroo:1, trick:1, worryseed:1, yawn:1
					};
					if (move.status || move.boosts || move.volatileStatus === 'confusion' || SubBlocked[move.id]) {
						return false;
					}
					return;
				}
				var damage = this.getDamage(source, target, move);
				if (!damage) {
					return null;
				}
				damage = this.runEvent('SubDamage', target, source, move, damage);
				if (!damage) {
					return damage;
				}
				if (damage > target.volatiles['substitute'].hp) {
					damage = target.volatiles['substitute'].hp;
				}
				target.volatiles['substitute'].hp -= damage;
				source.lastDamage = damage;
				if (target.volatiles['substitute'].hp <= 0) {
					target.removeVolatile('substitute');
					this.runEvent('AfterSubDamage', target, source, move, damage);
					return 0; // hit
				} else {
					this.add('-activate', target, 'Substitute', '[damage]');
					this.runEvent('AfterSubDamage', target, source, move, damage);
					return 0; // hit
				}
			},
			onEnd: function(target) {
				this.add('-end', target, 'Substitute');
			}
		}
	},
	/******************************************************************
	Two-turn moves:
	- now a bit better

	Justification:
	- Historically, these moves are useless.
	******************************************************************/
	solarbeam: {
		inherit: true,
		basePower: 60,
		willCrit: true,
		accuracy: true,
		onTryHitPriority: 10,
		onTryHit: function(target) {
			target.removeVolatile('substitute');
		},
		effect: {
			duration: 2,
			onLockMove: 'solarbeam',
			onStart: function(pokemon) {
				this.heal(pokemon.maxhp/2);
			}
		},
		breaksProtect: true
	},
	razorwind: {
		inherit: true,
		basePower: 40,
		willCrit: true,
		accuracy: true,
		onTryHitPriority: 10,
		onTryHit: function(target) {
			target.removeVolatile('substitute');
		},
		secondary: {
			chance: 100,
			volatileStatus: 'confusion'
		},
		breaksProtect: true
	},
	skullbash: {
		inherit: true,
		basePower: 50,
		willCrit: true,
		accuracy: true,
		onTryHitPriority: 10,
		onTryHit: function(target) {
			target.removeVolatile('substitute');
		},
		effect: {
			duration: 2,
			onLockMove: 'skullbash',
			onStart: function(pokemon) {
				this.boost({def:1,spd:1,accuracy:1}, pokemon, pokemon, this.getMove('skullbash'));
			}
		},
		breaksProtect: true
	},
	skyattack: {
		inherit: true,
		basePower: 70,
		willCrit: true,
		accuracy: true,
		onTryHitPriority: 10,
		onTryHit: function(target) {
			target.removeVolatile('substitute');
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1
			}
		},
		breaksProtect: true
	},
	freezeshock: {
		inherit: true,
		basePower: 70,
		willCrit: true,
		accuracy: true,
		onTryHitPriority: 10,
		onTryHit: function(target) {
			target.removeVolatile('substitute');
		},
		secondary: {
			chance: 100,
			status: 'par'
		},
		breaksProtect: true
	},
	iceburn: {
		inherit: true,
		basePower: 70,
		willCrit: true,
		accuracy: true,
		onTryHitPriority: 10,
		onTryHit: function(target) {
			target.removeVolatile('substitute');
		},
		secondary: {
			chance: 100,
			status: 'brn'
		},
		breaksProtect: true
	},
	bounce: {
		inherit: true,
		basePower: 45,
		willCrit: true,
		accuracy: true,
		onTryHitPriority: 10,
		onTryHit: function(target) {
			target.removeVolatile('substitute');
		},
		secondary: {
			chance: 100,
			status: 'par'
		},
		breaksProtect: true
	},
	fly: {
		inherit: true,
		basePower: 45,
		willCrit: true,
		accuracy: true,
		onTryHitPriority: 10,
		onTryHit: function(target) {
			target.removeVolatile('substitute');
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1
			}
		},
		breaksProtect: true
	},
	dig: {
		inherit: true,
		basePower: 45,
		willCrit: true,
		accuracy: true,
		onTryHitPriority: 10,
		onTryHit: function(target) {
			target.removeVolatile('substitute');
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1
			}
		},
		breaksProtect: true
	},
	dive: {
		inherit: true,
		basePower: 45,
		willCrit: true,
		accuracy: true,
		onTryHitPriority: 10,
		onTryHit: function(target) {
			target.removeVolatile('substitute');
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1
			}
		},
		breaksProtect: true
	},
	shadowforce: {
		inherit: true,
		basePower: 30,
		willCrit: true,
		accuracy: true,
		onTryHitPriority: 10,
		onTryHit: function(target) {
			target.removeVolatile('substitute');
		},
		secondary: {
			chance: 100,
			volatileStatus: 'curse'
		},
		breaksProtect: true
	},
	skydrop: {
		inherit: true,
		basePower: 40,
		willCrit: true,
		accuracy: true,
		secondary: {
			chance: 100,
			boosts: {
				def: -1
			}
		},
		breaksProtect: true
	},
	hyperbeam: {
		inherit: true,
		accuracy: true,
		basePower: 75,
		willCrit: true,
		self: null,
		onHit: function(target, source) {
			if (!target.hp) {
				source.addVolatile('mustrecharge');
			}
		}
	},
	gigaimpact: {
		inherit: true,
		accuracy: true,
		basePower: 75,
		willCrit: true,
		self: null,
		onHit: function(target, source) {
			if (!target.hp) {
				source.addVolatile('mustrecharge');
			}
		}
	},
	blastburn: {
		inherit: true,
		accuracy: true,
		basePower: 75,
		willCrit: true,
		self: null,
		onHit: function(target, source) {
			if (!target.hp) {
				source.addVolatile('mustrecharge');
			}
		}
	},
	frenzyplant: {
		inherit: true,
		accuracy: true,
		basePower: 75,
		willCrit: true,
		self: null,
		onHit: function(target, source) {
			if (!target.hp) {
				source.addVolatile('mustrecharge');
			}
		}
	},
	hydrocannon: {
		inherit: true,
		accuracy: true,
		basePower: 75,
		willCrit: true,
		self: null,
		onHit: function(target, source) {
			if (!target.hp) {
				source.addVolatile('mustrecharge');
			}
		}
	},
	/******************************************************************
	Snore:
	- base power increased to 100

	Justification:
	- Sleep Talk needs some competition
	******************************************************************/
	snore: {
		inherit: true,
		basePower: 100,
		affectedByImmunities: false
	},
	/******************************************************************
	Sound-based Normal-type moves:
	- not affected by immunities

	Justification:
	- they're already affected by Soundproof, also, ghosts can hear
	  sounds
	******************************************************************/
	hypervoice: {
		inherit: true,
		affectedByImmunities: false
	},
	round: {
		inherit: true,
		affectedByImmunities: false
	},
	uproar: {
		inherit: true,
		affectedByImmunities: false
	},
	/******************************************************************
	Relic Song:
	- secondary changed to 40% -Atk -SpA (80% after Serene Grace)

	Justification:
	- Meloetta-P needs viability
	******************************************************************/
	relicsong: {
		inherit: true,
		affectedByImmunities: false,
		onHit: function(target, pokemon) {
			if (pokemon.baseTemplate.species !== 'Meloetta' || pokemon.transformed) {
				return;
			}
			var natureChange = {
				'Modest': 'Adamant',
				'Adamant': 'Modest',
				'Timid': 'Jolly',
				'Jolly': 'Timid'
			};
			if (pokemon.template.speciesid==='meloettapirouette' && pokemon.transformInto('Meloetta')) {
				this.add('-formechange', pokemon, 'Meloetta');
				var tmpAtkEVs = pokemon.set.evs.atk;
				pokemon.set.evs.atk = pokemon.set.evs.spa;
				pokemon.set.evs.spa = tmpAtkEVs;
				if (natureChange[pokemon.set.nature]) pokemon.set.nature = natureChange[pokemon.set.nature];
				var Atk2SpA = (pokemon.boosts.spa||0) - (pokemon.boosts.atk||0);
				this.boost({
					atk: Atk2SpA,
					spa: -Atk2SpA
				}, pokemon);
			} else if (pokemon.transformInto('Meloetta-Pirouette')) {
				this.add('-formechange', pokemon, 'Meloetta-Pirouette');
				var tmpAtkEVs = pokemon.set.evs.atk;
				pokemon.set.evs.atk = pokemon.set.evs.spa;
				pokemon.set.evs.spa = tmpAtkEVs;
				if (natureChange[pokemon.set.nature]) pokemon.set.nature = natureChange[pokemon.set.nature];
				var Atk2SpA = (pokemon.boosts.spa||0) - (pokemon.boosts.atk||0);
				this.boost({
					atk: Atk2SpA,
					spa: -Atk2SpA
				}, pokemon);
			}
			// renderer takes care of this for us
			pokemon.transformed = false;
		},
		secondary: {
			chance: 40,
			boosts: {
				atk: -1,
				spa: -1
			}
		}
	},
	/******************************************************************
	Stealth Rock:
	- 1/4 damage to Flying-types, 1/8 damage to everything else

	Justification:
	- Never has one move affected the viability of types been affected
	  by one move to such an extent. Stealth Rock makes many
	  interesting pokemon NU, changing it gives them a fighting chance.

	Flavor justification:
	- Removes from it the status of only residual damage affected by
	  weaknesses/resistances, which is nice. The double damage to
	  Flying can be explained as counteracting Flying's immunity to
	  Spikes.
	******************************************************************/
	stealthrock: {
		inherit: true,
		effect: {
			// this is a side condition
			onStart: function(side) {
				this.add('-sidestart',side,'move: Stealth Rock');
			},
			onSwitchIn: function(pokemon) {
				var factor = 2;
				if (pokemon.hasType('Flying')) factor = 4;
				var damage = this.damage(pokemon.maxhp*factor/16);
			}
		}
	},
	quiverdance: {
		// Quiver Dance is nerfed because Volc
		inherit: true,
		boosts: {
			spd: 1,
			spe: 1,
			accuracy: 1
		},
		onModifyMove: function(move, user) {
			var GossamerWingUsers = {"Butterfree":1, "Masquerain":1, "Beautifly":1, "Mothim":1};
			if (user.item === 'stick' && GossamerWingUsers[user.template.species]) {
				move.boosts = {
					spa: 1,
					spd: 1,
					spe: 1,
					accuracy: 1
				};
			}
		}
	},
	/******************************************************************
	Silver Wind, Ominous Wind, AncientPower:
	- 100% chance of raising one stat, instead of 10% chance of raising
	  all stats
	- Silver Wind, Ominous Wind: 90 base power in Hail

	Justification:
	- Hail sucks

	Precedent:
	- Many weathers strengthen moves. SolarBeam's base power is
	  modified by weather.

	Flavor justification:
	- Winds are more damaging when it's hailing.
	******************************************************************/
	silverwind: {
		inherit: true,
		basePowerCallback: function() {
			if (this.isWeather('hail')) {
				return 90;
			}
			return 60;
		},
		secondary: {
			chance: 100,
			self: {
				onHit: function(target, source) {
					var stats = [];
					for (var i in target.boosts) {
						if (i !== 'accuracy' && i !== 'evasion' && target.boosts[i] < 6) {
							stats.push(i);
						}
					}
					if (stats.length) {
						var i = stats[this.random(stats.length)];
						var boost = {};
						boost[i] = 1;
						this.boost(boost);
					} else {
						return false;
					}
				}
			}
		}
	},
	ominouswind: {
		inherit: true,
		basePowerCallback: function() {
			if (this.isWeather('hail')) {
				return 90;
			}
			return 60;
		},
		secondary: {
			chance: 100,
			self: {
				onHit: function(target, source) {
					var stats = [];
					for (var i in target.boosts) {
						if (i !== 'accuracy' && i !== 'evasion' && target.boosts[i] < 6) {
							stats.push(i);
						}
					}
					if (stats.length) {
						var i = stats[this.random(stats.length)];
						var boost = {};
						boost[i] = 1;
						this.boost(boost);
					} else {
						return false;
					}
				}
			}
		}
	},
	ancientpower: {
		inherit: true,
		secondary: {
			chance: 100,
			self: {
				onHit: function(target, source) {
					var stats = [];
					for (var i in target.boosts) {
						if (i !== 'accuracy' && i !== 'evasion' && target.boosts[i] < 6) {
							stats.push(i);
						}
					}
					if (stats.length) {
						var i = stats[this.random(stats.length)];
						var boost = {};
						boost[i] = 1;
						this.boost(boost);
					} else {
						return false;
					}
				}
			}
		}
	},
	/******************************************************************
	Moves relating to Hail:
	- boost in some way

	Justification:
	- Hail sucks
	******************************************************************/
	avalanche: {
		inherit: true,
		basePowerCallback: function(pokemon, source) {
			if ((source.lastDamage > 0 && pokemon.lastAttackedBy && pokemon.lastAttackedBy.thisTurn)) {
				this.debug('Boosted for getting hit by '+pokemon.lastAttackedBy.move);
				return this.isWeather('hail')?180:120;
			}
			return this.isWeather('hail')?90:60;
		}
	},
	/******************************************************************
	Direct phazing moves:
	- changed to perfect accuracy

	Justification:
	- NEXT has buffed perfect accuracy to the point where unbanning
	  +evasion could be viable.
	- as the primary counter to set-up, these should be able to counter
	  DT (and subDT) in case they are ever unbanned.

	Precedent:
	- Haze, a move with a similar role, has perfect accuracy

	Flavor justification:
	- Whirlwinds and roaring are wide-area enough that dodging them
	  isn't generally feasible.
	******************************************************************/
	roar: {
		inherit: true,
		accuracy: true
	},
	whirlwind: {
		inherit: true,
		accuracy: true
	},
	/******************************************************************
	Multi-hit moves:
	- changed to perfect accuracy

	Justification:
	- as an Interesting Mechanic in terms of being able to hit past
	  Substitute, it could use a buff

	Flavor justification:
	- You're going to attack that many times and they're all going to
	  miss?
	******************************************************************/
	armthrust: {
		inherit: true,
		accuracy: true
	},
	barrage: {
		inherit: true,
		accuracy: true
	},
	beatup: {
		inherit: true,
		accuracy: true
	},
	bonemerang: {
		inherit: true,
		accuracy: true
	},
	bonerush: {
		inherit: true,
		accuracy: true
	},
	bulletseed: {
		inherit: true,
		accuracy: true
	},
	cometpunch: {
		inherit: true,
		accuracy: true
	},
	doublekick: {
		inherit: true,
		accuracy: true
	},
	doubleslap: {
		inherit: true,
		accuracy: true
	},
	dualchop: {
		inherit: true,
		accuracy: true
	},
	furyattack: {
		inherit: true,
		accuracy: true
	},
	furyswipes: {
		inherit: true,
		accuracy: true
	},
	geargrind: {
		inherit: true,
		accuracy: true
	},
	iciclespear: {
		inherit: true,
		accuracy: true
	},
	pinmissile: {
		inherit: true,
		accuracy: true
	},
	rockblast: {
		inherit: true,
		accuracy: true
	},
	spikecannon: {
		inherit: true,
		accuracy: true
	},
	tailslap: {
		inherit: true,
		accuracy: true
	},
	/******************************************************************
	Draining moves:
	- move types around, buff Leech Life

	Justification:
	- Poison, Bug, and Grass make sense for draining moves. Fighting
	  really doesn't.
	******************************************************************/
	leechlife: {
		inherit: true,
		basePower: 75
	},
	drainpunch: {
		inherit: true,
		basePower: 80,
		type: 'Poison'
	},
	/******************************************************************
	Flying moves:
	- now a bit better

	Justification:
	- Flying has always been the type that's suffered from limited
	  distribution. Let's see how it does without that disadvantage.
	******************************************************************/
	twister: {
		inherit: true,
		basePower: 80,
		secondary: {
			chance: 30,
			volatileStatus: 'confusion'
		},
		pp: 15,
		type: "Flying"
	},
	wingattack: {
		inherit: true,
		basePower: 40,
		accuracy: true,
		multihit: [2,2]
	},
	/******************************************************************
	Moves with not enough drawbacks:
	- intensify drawbacks

	Justification:
	- Close Combat is way too common.
	******************************************************************/
	closecombat: {
		inherit: true,
		self: {
			boosts: {
				def: -2,
				spd: -2
			}
		}
	},
	/******************************************************************
	Blizzard:
	- 30% freeze chance

	Justification:
	- freeze was nerfed, Blizzard can now have Thunder/Hurricane-like
	  secondary chances.
	******************************************************************/
	blizzard: {
		inherit: true,
		secondary: {
			chance: 30,
			status: 'frz'
		}
	},
	/******************************************************************
	Selfdestruct and Explosion:
	- 120 and 180 base power autocrit

	Justification:
	- these were nerfed unreasonably in gen 5, they're now somewhat
	  usable again.
	******************************************************************/
	selfdestruct: {
		inherit: true,
		basePower: 140,
		accuracy: true,
		willCrit: true
	},
	explosion: {
		inherit: true,
		basePower: 180,
		accuracy: true,
		willCrit: true
	},
	/******************************************************************
	Echoed Voice:
	- change

	Justification:
	- no one uses Echoed Voice.
	******************************************************************/
	echoedvoice: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		isViable: true,
		priority: 0,
		isNotProtectable: true,
		affectedByImmunities: false,
		onHit: function(target, source) {
			source.side.addSideCondition('futuremove');
			if (source.side.sideConditions['futuremove'].positions[source.position]) {
				return false;
			}
			source.side.sideConditions['futuremove'].positions[source.position] = {
				duration: 3,
				move: 'echoedvoice',
				targetPosition: target.position,
				source: source,
				moveData: {
					basePower: 80,
					category: "Special",
					type: 'Normal'
				}
			};
			this.add('-start', source, 'Echoed Voice');
		},
		target: "normal",
		type: "Normal"
	},
	/******************************************************************
	New feature: Signature Pokemon
	- Selected weak moves receive a 1.5x damage boost when used by a
	  compatible Pokemon.

	Justification:
	- Gives a use for many otherwise competitively unviable moves
	- This is the sort of change that Game Freak is likely to make
	******************************************************************/
	firefang: {
		inherit: true,
		onBasePower: function(power, user) {
			if (user.template.id === 'flareon') return power * 1.5;
		},
		accuracy: 100,
		secondaries: [
			{chance:20, status:'brn'},
			{chance:30, volatileStatus:'flinch'}
		]
	},
	icefang: {
		inherit: true,
		onBasePower: function(power, user) {
			if (user.template.id === 'walrein') return power * 1.5;
		},
		accuracy: 100,
		secondaries: [
			{chance:20, status:'frz'},
			{chance:30, volatileStatus:'flinch'}
		]
	},
	thunderfang: {
		inherit: true,
		onBasePower: function(power, user) {
			if (user.template.id === 'luxray') return power * 1.5;
		},
		accuracy: 100,
		secondaries: [
			{chance:20, status:'par'},
			{chance:30, volatileStatus:'flinch'}
		]
	},
	poisonfang: {
		inherit: true,
		onBasePower: function(power, user) {
			if (user.template.id === 'drapion') return power * 1.5;
		},
		accuracy: 100,
		secondaries: [
			{chance:100, status:'tox'},
			{chance:30, volatileStatus:'flinch'}
		]
	},
	poisontail: {
		inherit: true,
		basePower: 60,
		onBasePower: function(power, user) {
			if (user.template.id === 'seviper') return power * 1.5;
		},
		accuracy: 100,
		secondary: {
			chance: 60,
			status: 'tox'
		}
	},
	sludge: {
		inherit: true,
		basePower: 60,
		onBasePower: function(power, user) {
			if (user.template.id === 'muk') return power * 1.5;
		},
		secondary: {
			chance: 100,
			status: 'psn'
		}
	},
	smog: {
		inherit: true,
		basePower: 75,
		onBasePower: function(power, user) {
			if (user.template.id === 'weezing') return power * 1.5;
		},
		secondary: {
			chance: 100,
			status: 'psn'
		}
	},
	flamecharge: {
		inherit: true,
		onBasePower: function(power, user) {
			if (user.template.id === 'rapidash') return power * 1.5;
		}
	},
	flamewheel: {
		inherit: true,
		onBasePower: function(power, user) {
			if (user.template.id === 'darmanitan') return power * 1.5;
		}
	},
	electroweb: {
		inherit: true,
		basePower: 60,
		onBasePower: function(power, user) {
			if (user.template.id === 'galvantula') return power * 1.5;
		},
		accuracy: 100
	},
	icywind: {
		inherit: true,
		basePower: 60,
		onBasePower: function(power, user) {
			if (user.template.id === 'glaceon') return power * 1.5;
		},
		accuracy: 100
	},
	mudshot: {
		inherit: true,
		basePower: 60,
		onBasePower: function(power, user) {
			if (user.template.id === 'swampert') return power * 1.5;
		},
		accuracy: 100
	},
	glaciate: {
		inherit: true,
		basePower: 80,
		onBasePower: function(power, user) {
			if (user.template.id === 'kyurem') return power * 1.5;
		},
		accuracy: 100
	},
	octazooka: {
		inherit: true,
		basePower: 75,
		onBasePower: function(power, user) {
			if (user.template.id === 'octillery') return power * 1.5;
		},
		accuracy: 90,
		secondary: {
			chance: 100,
			boosts: {
				accuracy: -1
			}
		}
	},
	leaftornado: {
		inherit: true,
		basePower: 75,
		onBasePower: function(power, user) {
			if (user.template.id === 'serperior') return power * 1.5;
		},
		accuracy: 90,
		secondary: {
			chance: 100,
			boosts: {
				accuracy: -1
			}
		}
	},
	iceshard: {
		inherit: true,
		onBasePower: function(power, user) {
			if (user.template.id === 'weavile') return power * 1.5;
		}
	},
	aquajet: {
		inherit: true,
		onBasePower: function(power, user) {
			if (user.template.id === 'sharpedo') return power * 1.5;
		}
	},
	machpunch: {
		inherit: true,
		onBasePower: function(power, user) {
			if (user.template.id === 'hitmonchan') return power * 1.5;
		}
	},
	shadowsneak: {
		inherit: true,
		onBasePower: function(power, user) {
			if (user.template.id === 'banette') return power * 1.5;
		}
	},
	/******************************************************************
	Moves with 95% accuracy, also Rock Slide and Charge Beam:
	- buffed to 100% accuracy

	Justification:
	- missing Hydro Pump is losing a gamble, but missing V-create is
	  nothing but hax
	- Rock Slide is included for being similar enough to Air Slash
	- Charge Beam is included because its 30% chance of no boost is enough
	******************************************************************/
	razorshell: {
		inherit: true,
		accuracy: 100
	},
	drillrun: {
		inherit: true,
		accuracy: 100
	},
	vcreate: {
		inherit: true,
		accuracy: 100
	},
	aeroblast: {
		inherit: true,
		accuracy: 100
	},
	sacredfire: {
		inherit: true,
		accuracy: 100
	},
	spacialrend: {
		inherit: true,
		accuracy: 100
	},
	airslash: {
		inherit: true,
		accuracy: 100
	},
	rockslide: {
		inherit: true,
		accuracy: 100
	},
	chargebeam: {
		inherit: true,
		accuracy: 100
	},
	aircutter: {
		inherit: true,
		accuracy: 100
	},
	furycutter: {
		inherit: true,
		accuracy: 100
	},
	crushclaw: {
		inherit: true,
		accuracy: 100
	},
	razorleaf: {
		inherit: true,
		accuracy: 100
	},
	stringshot: {
		inherit: true,
		accuracy: 100
	},
	metalclaw: {
		inherit: true,
		accuracy: 100
	},
	snarl: {
		inherit: true,
		accuracy: 100
	},
	/******************************************************************
	Signature moves and other moves with limited distribution:
	- buffed in various ways

	Justification:
	- more metagame variety is always good
	******************************************************************/
	twineedle: {
		inherit: true,
		basePower: 50
	},
	drillpeck: {
		inherit: true,
		basePower: 100,
		pp: 10
	},
	needlearm: {
		inherit: true,
		basePower: 100,
		pp: 10
	},
	leafblade: {
		inherit: true,
		basePower: 100,
		pp: 10
	},
	attackorder: {
		inherit: true,
		basePower: 100,
		pp: 10
	},
	stomp: {
		inherit: true,
		basePower: 100,
		accuracy: true,
		pp: 10
	},
	steamroller: {
		inherit: true,
		basePower: 100,
		accuracy: true,
		pp: 10
	},
	crabhammer: {
		inherit: true,
		basePower: 100,
		accuracy: 100
	},
	doublehit: {
		inherit: true,
		basePower: 40,
		accuracy: true
	},
	autotomize: {
		inherit: true,
		boosts: {
			spe: 3
		}
	},
	nightdaze: {
		inherit: true,
		accuracy: 100,
		onModifyMove: function(move, user) {
			if (user.illusion) {
				var illusionMoves = user.illusion.moves.filter(function(illusionMove) {
					var illusionMove = this.getMove(illusionMove);
					return illusionMove.category !== 'Status';
				}, this);
				if (illusionMoves.length) move.name = this.getMove(illusionMoves.sample()).name;
			}
		}
	},
	muddywater: {
		inherit: true,
		basePower: 85,
		accuracy: 100,
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1
			}
		}
	},
	powergem: {
		inherit: true,
		basePower: 40,
		accuracy: true,
		multihit: [2,2]
	},
	acid: {
		inherit: true,
		affectedByImmunities: false
	},
	acidspray: {
		inherit: true,
		affectedByImmunities: false
	},
	triattack: {
		num: 161,
		accuracy: true,
		basePower: 30,
		category: "Special",
		desc: "Hits 3 times. Has a 10% chance to burn, paralyze or freeze the target each time.",
		shortDesc: "hits 3x; 10% chance to paralyze/burn/freeze.",
		id: "triattack",
		name: "Tri Attack",
		pp: 10,
		isViable: true,
		priority: 0,
		multihit: [3,3],
		secondary: {
			chance: 10,
			onHit: function(target, source) {
				var result = this.random(3);
				if (result===0) {
					target.trySetStatus('brn', source);
				} else if (result===1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
				}
			}
		},
		target: "normal",
		type: "Normal"
	}
};