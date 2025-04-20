import { Dictionary } from "lodash";
import { PieceSet, PieceSetIds } from "../types";
import { aoa1PieceSet, battleBox1PieceSet, forgottenForestPieceSet, fortressPieceSet, landsPieceSet, laurJunglePieceSet, marvelPieceSet, maxSharedTerrainKit, ms1PieceSet, ms2PieceSet, snowsPieceSet, swampsPieceSet, thaelenkPieceSet, ticallaJunglePieceSet, tournamentOrganizerTerrainKitPieceSet, underdarkPieceSet, volcarrenPieceSet, watersPieceSet } from "./inventories";

export const pieceSets: Dictionary<PieceSet> = {
  [PieceSetIds.totk]: {
    id: PieceSetIds.totk,
    title: `Tournament Organizer Terrain Kit`,
    inventory: tournamentOrganizerTerrainKitPieceSet,
    abbreviation: "TOTK",
  },
  [PieceSetIds.mstk]: {
    id: PieceSetIds.mstk,
    title: `Max Shared Terrain Kit`,
    inventory: maxSharedTerrainKit,
    abbreviation: "MSTK",
  },
  [PieceSetIds.aoaMaster1]: {
    id: PieceSetIds.aoaMaster1,
    title: `Age of Annihilation Master Set`,
    inventory: aoa1PieceSet,
    abbreviation: "AoA",
  },
  [PieceSetIds.battleForWellspring]: {
    id: PieceSetIds.battleForWellspring,
    title: `Battle for the Wellspring Battle Box`,
    inventory: battleBox1PieceSet,
    abbreviation: "BftW",
  },
  [PieceSetIds.landsOfValhalla]: {
    id: PieceSetIds.landsOfValhalla,
    title: `Lands of Valhalla Terrain Expansion`,
    inventory: landsPieceSet,
    abbreviation: "LoV",
  },
  [PieceSetIds.watersOfValhalla]: {
    id: PieceSetIds.watersOfValhalla,
    title: `Waters of Valhalla Terrain Expansion`,
    inventory: watersPieceSet,
    abbreviation: "WoV",
  },
  [PieceSetIds.laurJungle]: {
    id: PieceSetIds.laurJungle,
    title: `The Grove at Laur’s Edge Terrain Expansion`,
    inventory: laurJunglePieceSet,
    abbreviation: "GaLE",
  },
  [PieceSetIds.snowfieldsOfValhalla]: {
    id: PieceSetIds.snowfieldsOfValhalla,
    title: `Snow Fields of Valhalla Terrain Expansion`,
    inventory: snowsPieceSet,
    abbreviation: "SFoV",
  },
  [PieceSetIds.swampsOfValhalla]: {
    id: PieceSetIds.swampsOfValhalla,
    title: `Swamps of Valhalla Terrain Expansion`,
    inventory: swampsPieceSet,
    abbreviation: "SoV",
  },
  [PieceSetIds.lavafieldsOfValhalla]: {
    id: PieceSetIds.lavafieldsOfValhalla,
    title: `Lava Fields of Valhalla Terrain Expansion`,
    inventory: swampsPieceSet,
    abbreviation: "LFoV",
  },
  [PieceSetIds.underdarkMaster]: {
    id: PieceSetIds.underdarkMaster,
    title: `Battle for the Underdark Master Set`,
    inventory: underdarkPieceSet,
    abbreviation: "BftU",
  },
  [PieceSetIds.riseOfValkyrieMaster]: {
    id: PieceSetIds.riseOfValkyrieMaster,
    title: `Rise of the Valkyrie Master Set`,
    inventory: ms1PieceSet,
    abbreviation: "RotV",
  },
  [PieceSetIds.swarmOfMarroMaster]: {
    id: PieceSetIds.swarmOfMarroMaster,
    title: `Swarm of the Marro Master Set`,
    inventory: ms2PieceSet,
    abbreviation: "SotM",
  },
  [PieceSetIds.forgottenForest]: {
    id: PieceSetIds.forgottenForest,
    title: `Road to the Forgotten Forest`,
    inventory: forgottenForestPieceSet,
    abbreviation: "RttFF",
  },
  [PieceSetIds.fortress]: {
    id: PieceSetIds.fortress,
    title: `Fortress of the Archkyrie`,
    inventory: fortressPieceSet,
    abbreviation: "FotA",
  },
  [PieceSetIds.volcarren]: {
    id: PieceSetIds.volcarren,
    title: `Volcarran Wasteland`,
    inventory: volcarrenPieceSet,
    abbreviation: "VW",
  },
  [PieceSetIds.thaelenkTundra]: {
    id: PieceSetIds.thaelenkTundra,
    title: `Thaelenk Tundra`,
    inventory: thaelenkPieceSet,
    abbreviation: "TT",
  },
  [PieceSetIds.ticallaJungle]: {
    id: PieceSetIds.ticallaJungle,
    title: `Ticalla Jungle`,
    inventory: ticallaJunglePieceSet,
    abbreviation: "TJ",
  },
  [PieceSetIds.marvel]: {
    id: PieceSetIds.marvel,
    title: `Marvel: The Conflict Begins`,
    inventory: marvelPieceSet,
    abbreviation: "MtCB",
  },
}