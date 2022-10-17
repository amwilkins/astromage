export const imageFilename = (name: string) => {
  return `./images/cards/${imageMap[name]}`;
};

const imageMap: { [cardName in string]: string } = {
  // Defense
  "Reinforce Hull": "reinforce_hull.png",
  "Matter Conversion": "matter_conversion.png",
  "Auto-Repair": "auto_repair.png",
  "Prioritize Critical Systems": "prioritize_critical_systems.png",
  "Ghost Ship Salvage": "ghost_ship_salvage.png",
  "Unionize Workers": "unionize_workers.png",
  "Sabotage Mining": "sabotage_mining.png",
  "Space Welders": "space_welders.png",
  "Matter Accumulation": "matter_accumulation.png",
  "Arclight Torches": "arclight_torches.png",
  "Recycle Material": "recycle_material.png",
  "Radioactive Deposits": "radioactive_deposits.png",
  "Elemental Discoveries": "elemental_discoveries.png",
  "Steal Industry Secrets": "steal_industry_secrets.png",
  "Rare Ore Asteroid Mining Facility": "rare_ore_asteroid_mining_facility.png",
  // Offense
  "Pulse Beam": "pulse_beam.png",
  "Kinetic Shot": "kinetic_shot.png",
  "Missile Barrage": "missile_barrage.png",
  "2-Stage Charge": "2_stage_charge.png",
  "Recruit Pacifists": "recruit_pacifists.png",
  "Laser Factory": "laser_factory.png",
  "Magnetic Accelerators": "magnetic_accelerators.png",
  "Rebel Mercs": "rebel_mercs.png",
  "Incinerate": "incinerate.png",
  "Jam Systems": "jam_systems.png",
  "Attack Supply Lines": "attack_supply_lines.png",
  "Advanced Weaponry": "advanced_weaponry.png",
  "Ram": "ram.png",
  "Photon Torpedo": "photon_torpedo.png",
  "Cyber Attack": "cyber_attack.png",
  "Fleet General": "fleet_general.png",
  "Ultra-Marine Assault": "ultra_marine_assault.png",
  "Titan War Engine": "titan_war_engine.png",
  // Power
  "Quantum Generator": "quantum_generator.png",
  "Sensor Array": "sensor_array.png",
  "Enhanced Logistics": "enhanced_logistics.png",
  "Force Field": "force_field.png",
  "Overload Reactor": "overload_reactor.png",
  "Life Support Systems": "life_support_systems.png",
  "Psy-Scout Prospecting": "psy_scout_prospecting.png",
  "Targeted Discharge": "targeted_discharge.png",
  "Android Hospital": "android_hospital.png",
  "Theseus System": "theseus_system.png",
  "Energy Weapons": "energy_weapons.png",
  "Sacrifice": "sacrifice.png",
  "Ancient Knowledge": "ancient_knowledge.png",
  "Energy Leeches": "energy_leeches.png",
  "Cosmic Dragon": "cosmic_dragon.png",
  "Reality Warp": "reality_warp.png",
  "E.M.P": "emp.png",
};