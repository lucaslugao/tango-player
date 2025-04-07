const puzzleSets = [
    [
        "Single Piece",
        [
            ["1", "AAAAAAAAAABAAAAAAABChAggAAAAARAA"],
            ["2", "AAAAgAAAAAAAQAAAAAAgAAEQAAAgBAQA"],
            ["3", "AAAAAACAAAAAQgAAAAggAAAQAACAAABA"],
            ["4", "AAAAACAIAAAAQgAAgBAgAAEgAAAABAAA"],
            ["5", "AAAAAACCAAAAAAAAAAAggAAQAAAAIgRA"],
            ["6", "AAAAAAAIAAAAAABACAAAgAAUAAAAAgBA"],
            ["7", "AAAAAAAgAAAAAAAAgBAggAAQAAAgBQAA"],
            ["8", "AAAAAAIAAAAAAAAAAAggAAEgAAAQAgBA"],
            ["9", "AAAAAAAAABAEQgAAAAggAAAQAAAAAgQA"],
            ["10", "AAAAAACCAAAAIAAAAAAgAAAEAIAgBQAA"],
            ["11", "ACAIAAAAAAAAIQAACBAAhAghAAAAAAAA"],
            ["12", "AAAAAAAAAAAQIAAAAAghAAAgAAAABAQA"],
        ],
    ],
    [
        "Three Piece",
        [
            ["1", "ggAACAIQAAAAAAAAgFAAAgAAAAAAABAA"],
            ["2", "AAEAAIBhAAAAAAAEAAAAAgAAQAAAgBAA"],
            ["3", "gAAIAAAgAAAAAAAEAAAAAgAIAAAAABAA"],
            ["4", "ioIgAAAAAAAAAAAAAAAAAgAIAAAAAQAA"],
            ["5", "ggBBQQAAAAAAAAAAABAAAkAIAAAABAAA"],
            ["6", "ACAIEAQAAAAQAAAAAFIAAAAAQEIAAAAA"],
            ["7", "AABJAAIAAAAAAAAAAAgAAgAAAAAAABAQ"],
        ]
    ],
    [
        "Linkedin",
        [
            ["164", "AACAAASiAAWqQAABAggAAAAAAAAAAAAA"],
            ["163", "xiEIAAAAAIThAAABAABhAAExQgAAAABA"],
            ["162", "QAAAAAAAAACCAICAuJgp/z8nIK3hDACE"],
            ["161", "wQyGAAAAYAjPAAAACFIAAAAAAIQABQAA"],
            ["160", "BAEQhDEMQAAEAAAAAAAAAAAAxAAAAkAY"],
            ["159", "AAgAAAEgAAAEAAAAAIgxhhhijADACAAA"],
            ["158", "AAAAgATJlocwAABACAAAAAEACAAAAAAA"],
            ["157", "RAUAACQIACCoAGA8BgAAAAAAABgDAIAY"],
            ["156", "CCNJgAQADAMAAAAAAIQAACAUAAAACAAA"],
            ["155", "AAAAAAMAgsQwQAkDAAAAAAAAAAAAAIAw"],
            ["154", "IIqiGA4AAAAAACAMAAAAQCwGAAAAAAAA"],
            ["153", "AAAADEMwAAAASAECIwAAAAAAACACoBQh"],
            ["152", "AAAADIMwAAAAygEAAIwAAAAAAACAyBwA"],
            ["151", "gAQAAAAAggQAABADCACEAAGjEAAAAAgx"],
            ["150", "AACAAAAAQQAAAAhjDgAAQAgACIwDAABj"],
            ["149", "kgQwABCGAABIAAAAAAAhAkQIQoAAAAAA"],
            ["148", "wgAIMI6gMA4ACDEGAABjMAYAAGOAAAAA"],
            ["147", "gAEMQAAAAAAAAAAAAACUIw4AABADwDmE"],
            ["146", "ACB5AAAAAAAAAAAAACAAEAIAIUARAggA"],
            ["145", "wyAMAAAAAAzCAAAAAAAQIzzGGAAAAAAA"],
            ["144", "RIUoQSEIQAAAAAAAAAAAAAAAAIQQghRS"],
            ["143", "AAgAAAAAABAECHFuDAAgQAhhCIgBEIYx"],
            ["142", "AAAADEMwAAAAAABACCEggAAhhIQAAgAA"],
            ["141", "AEAYggFhCAYAAAAASAghEAIgIYQACAAA"],
            ["140", "AAAAAACGwwwwgAABIgAAAAAAAAAAAAAQ"],
            ["139", "AAAACAMwAAAAAAAAY4wAAAAAADDCCAAA"],
            ["138", "YQgAAAAAAACGAACgnHGEEEIIIcwxBwAA"],
            ["137", "AAgAAAEgABAEoAABAAAAAAAAAAAAQChA"],
            ["136", "AAMAAAAAAAAAAIQIQIggKgWiUgDACEiI"],
            ["135", "wwEETQcQBAEAAAAgjDAAAIAxxgAAAAAA"],
            ["134", "GC6qEA4AEAQAACAMAAAAIBwGAAAAIAYA"],
            ["133", "AAAACBOEkMQwIYIAYwgAAAAAAACEAAAI"],
            ["132", "AAAAAEAwkBSGgAgBYwgAAAAAAACEAIAQ"],
            ["131", "YShJAAAAkASGAAACAAAAKAUAUAAAAAAh"],
            ["130", "wQEIxgEAAAAAAAAAAAAAAIAwxAAAAADE"],
            ["129", "AGB9ABAcAAAEpAIAAACgAAAAACAAAAAA"],
            ["128", "ADAMwwDCAAwACAMAAIQAAAAAAACEMAYA"],
            ["127", "AAAACAMwDIMwAAAgFKUAAAAAAABACgAA"],
            ["126", "AABZgAEAgAAAAAAAAAAAAIAQQgABBAAA"],
            ["125", "QDAMQQCAIAyCAADAOAAAAAAAAOcAAAAA"],
            ["124", "QShJAAAAkBSGAAAAAAAAAAIAIAAAAAAA"],
            ["123", "CAJAIAgEggAQIAAAAgAgAAAhABACACEA"],
            ["122", "YQgggABBAAGGCAEAAgAAAAAAAAACIAQA"],
            ["121", "ilpUggIUgAAEAAAAAAAAAAAAAAAAACGA"],
            ["120", "QRiGAAAAAAAAAADAGGMAGEMIIc45BwAA"],
            ["119", "oFpUggoAAAAAABACACEAEAIAIbUSohQh"],
            ["118", "Zcu2AAAAAAAAAAAIAAAAQAgAgAAAAACE"],
            ["117", "ggKGAAAAYQhQAAAAACAAAAIAIAAQAgAA"],
            ["116", "AAjiCEIQxhEEQgAQwhgAAAAAABAijBAA"],
            ["115", "BCMIYBiEEAQwEEIIAAAAAAAAAAAAEEII"],
            ["114", "AAAAAAAAAADAxgEAQP8AAGAcAACYAwAA"],
            ["113", "AAIAAAgEQSAcAAIAAAAIAQQEEAAAAEAI"],
            ["112", "AGBYECQIgAYAQqYEAAAAAAAAAAAAgJKQ"],
            ["111", "IAzAAAAAwCAMAAAgBBBCAAEQQAghBAAA"],
            ["110", "UQQgAAAABCGKAAAIAgAAAQAEABACAAAI"],
            ["109", "wyAMwQAMAAAAAAAAAAAAAgAgAAAyDiHn"],
            ["108", "AAAAAIMwAAAAAIRICCEAAAAAAIQAAkCI"],
            ["107", "KApAIAgAAAAAABACAISAICQEICEAAAgA"],
            ["106", "AAAIAAAAAABAAAAABACACAEQIQAiBCCE"],
            ["105", "w6M8QQAAAAAAAAAAAAAAIIw4QIwDBABA"],
            ["104", "wgAIgoFgEATBAACEMAAAQAgACGMAAAAQ"],
            ["103", "AAzCAAAAwCAMIYQQQgiEEAIIIBBCCCCA"],
            ["102", "gAAMAAAAMAxBEAIAIQBAAIEQQiAAAAIA"],
            ["101", "VAWAQACAQICoAABACFIAAAAAAIQIBQAA"],
            ["100", "AAAQgoFgAAIAMcIIAAAAISSEEAAAAGOM"],
            ["99", "AABAkgZZggAAxAAAAAAAhAAAgAAAgBgA"],
            ["98", "UCSKQQSIUCSIAAAACAAAAAAAAIQAAAAA"],
            ["97", "BAEQxYHgAIIgCCMMAAAAAAAAAAAAIMYY"],
            ["96", "AABBAEYYggAAEAMBAAAAAAAAAAAAIAZA"],
            ["95", "hhEMAAAAAAxhACAEIYQAAAAAACCAAIAQ"],
            ["94", "ACEoRIWoAAUgACEEAAAAAAAAAAAAIAQQ"],
            ["93", "AIB4BAEQAAAAAAAAAAAAAAAAYsQBAAAA"],
            ["92", "BCNJQBiGgEQwAAAAAAAAASAEAAAAAAAA"],
            ["91", "gpFkQACApAlhAAAkBABCAAAQAAABAIAQ"],
            ["90", "MAyAAIMgwwAIIQAAQAgAAAAAAAACAACA"],
            ["89", "wwAYAAAAEAbCAAAIIUIAAAAAACAAAQAI"],
            ["88", "AADBICwMwQAAQgAgRAiAhEIIoQABCBAA"],
            ["87", "ACAIiKKoAAqCAIwBAAAACAMAAAAgBgAA"],
            ["86", "ACAIwgAIxQEAAAAAAAAAAQAAAAgrBwAA"],
            ["85", "8AzOAAAAAAAAAEAIAICEAEAIADFCCCOE"],
            ["84", "gqMoAAAAEEVwADAGIQAhAAAhACEAAAAx"],
            ["83", "AAgAAAEgAAAEY4wBIYAAAAAAACGAADHC"],
            ["82", "AMAwACAYAAAMAAEAAACEAAAAAEAAAAAA"],
            ["81", "AIBoggBBlAUAkAoBAAAAAAAAAAAAQApA"],
            ["80", "BAEYwADCEIYgEAIIAAAAAAAAAAAAAEII"],
            ["79", "EAQEAAAAIAgIAABAHADMAcAcAMYBAAAA"],
            ["78", "AIMwDEMwCEMwIQIAAAAhAgAiAAAAACIA"],
            ["77", "AAAIxSXrAAQAAABAGAAAYAxAGMYAAAAA"],
            ["76", "AACCIAxhDCMYQggRAggAAAAAAAAAACCE"],
            ["75", "gAQgQACAAAFIAAAAgBAAAAEAQgAABAAA"],
            ["74", "gkEYAAAAEIZhACAEIUAAAhACACAIAQAQ"],
            ["73", "QBAECAYAggAIQEAIBAAAAAgQAAAAAAAh"],
            ["72", "VAWoAAAAQYWqAAAAACEAAAAAAAAQAgAA"],
            ["71", "BAWGCAIQQYgohChFiHKEKEWIUoQoR4hS"],
            ["70", "AIB4gCRJhgcAAAAAAAAQQghCCAAAAAAA"],
            ["69", "igKAQACCQABRAAAAAEJAAIAQAAAAAQAA"],
            ["68", "AAAAAIEgAAAAgAAIIAggAAAgAIAACAAA"],
            ["67", "ghBtoghIoohgCAMAAAAAAAAAAAAAIAYA"],
            ["66", "mAcAAAAAAGB5AAAAFABAAAAQAEABAAAA"],
            ["65", "gAAAAAAAAABBgAAQAoQACSEEQACCQAgA"],
            ["64", "oAoAECUoABBVhEAIQAgQChECQgBASEgI"],
            ["63", "8AwABEMwADDMAAAAAAAgAAAgAAAAAAAA"],
            ["62", "gAAAIAiAAAAIABACIgCEAAAIACDCCAAA"],
            ["61", "AAAAAAAAkES0AIQCAAgAhAIAKQCAAAAo"],
            ["60", "AEIQgBAEAAAAIcKIEECEAAIAAAAAAAAA"],
            ["59", "BINhAAAAgoEwAAAQAhBCAAAQAAAiBAAA"],
            ["58", "AAAAAACiAIAgYoQBAABihAEQQgAAACGA"],
            ["57", "wAAMAAAAAAAAAAAAAACAAAIIIBBCCCGE"],
            ["56", "AAEQwgDBAIIgAAAAQggAAAAAABBCCAAA"],
            ["55", "QAAAAAAAIAjBAAIYQggAAAAAAAAAAAII"],
            ["54", "AASCAAAAQAAIAIQAghBCEEIIQAgBCCEA"],
            ["53", "VYWqAAAAAAAAACAEAIQAAAQAgAAgBACE"],
            ["52", "AAhACEpQqApVIIAAAAAAAAAAAAAAAAAA"],
            ["51", "AABhIAgEgoFhQAAAAABAAAAQAAAAAAAA"],
            ["50", "ACCIBIUoQQQAgAAAAAAAIASAEAAAAAgA"],
            ["49", "AIIgSQ4EQcA8AAAAoVIAkAIoAEqFAAAA"],
            ["48", "RYWoRAUAAAAAAEAIAIAAAAAAAABACACA"],
            ["47", "ACCaAAgESQYAAIYAAACAAEAIAAAAEAKA"],
            ["46", "IChIAAAAkgQEAABACCCEAAAIAIQQAgAA"],
            ["45", "IAwQggBBABIMIIAAAAAAAAAAAAAAACGE"],
            ["44", "wAAEBAEAIAhBAADgnHMAAAAAAM45BwAA"],
            ["43", "BAMAaRqUAIAwAAAAYAgAAAAAACFACAAA"],
            ["42", "AGAcQBEcAAAAAAAAAAAIAQAAQBACAAAh"],
            ["41", "AADBMCwMwQAAQAAgBAgAhAAAhAhBiBAA"],
            ["40", "QQAQECQICAKAQgAAAACAAEAIAAAAgBAA"],
            ["39", "AAAYggBhAAIAAAIIAAAAAAAAACGAAAAA"],
            ["38", "QQAIBAEgEASASAEAAAAIASAEAAAAgBQA"],
            ["37", "UIQoBAEoUAQAAAAAAAAAAAAAAAAAEGKI"],
            ["36", "iAIAgkJRAEBQACAlFAAAAAAAAEIBAIBQ"],
            ["35", "AAAA4TzNAAAAgAAACAAAhAhAjIQAAAgA"],
            ["34", "QQSIAIEgQQSKAAAAAAAAAhhCCAAAAAAA"],
            ["33", "ABAEAAAAAAgAEAIABCCAAEAIAAgRAgIA"],
            ["32", "AEAYCCYYGAYAAAEBAAAAAAAAAAAAAARC"],
            ["31", "ghTNAAAA0wxIAAAAAABACAEQQgAAAAAA"],
            ["30", "iFJVggIAAAAAAAAAAAAAACAUAKECoBQA"],
            ["29", "kiTPAAAAQYh4AAAAAACAEAIIIQAAAAAA"],
            ["28", "giIoAAAABAVRAAACACEAEAIAIAAQAgAh"],
            ["27", "ACCoAICqAKCotZIKAAAAAAAAAAAAAAAA"],
            ["26", "gghIAEIQkhRFAAgBAAAAAAAAAAAAAABA"],
            ["25", "AIAwkiRIBAMAMcYIAAAAAAAAAAAAAGKI"],
            ["24", "AAAIgABBEAQAABCCEAAAASAEAEAAAAAg"],
            ["23", "wWAYCANhIAyCACIEAIQAAAAAACEAIAQI"],
            ["22", "AEAYCCYYGAYAAAEBAAAAAAAAAAAAAARC"],
            ["21", "AAAAAAAAAAxAAAAAAABCCBFKKKSEEkoo"],
            ["20", "gBAUgkJQCApAACEEIYAAAAAAACGAAIQQ"],
            ["19", "AAgEIAgEABgEjAFADACMAWAMAIQBYAwA"],
            ["18", "AEAQgoFhAAIAAAAAIIAAAAAAACCEAAAA"],
            ["17", "ECWoQCAIQQAIAAAAAAAAAIAQQAAAACGA"],
            ["16", "iEMQQQAMQQAAAAAAAAAQAgAAhAAAQJgw"],
            ["15", "AAsIQAAEgACyAACAEACEAEAIUggBAAAA"],
            ["14", "BGEYgABACAYgACAEIYAAAAAAACGEAAAQ"],
            ["13", "AACgECUoRQEAQgABQggAAAAAABBCCBBA"],
            ["12", "ACIYggAEAAAAAAAAAAAAAAAggIRSCgAA"],
            ["11", "YQhJCEMwgBSEhBACAAAAAAAAAAAAAAgg"],
            ["10", "CIIgEG4cAAEQEEIYAggAAAAAABACGEII"],
            ["9", "AAQgAEIQBCEIQgAQAgAhAAAgAAACABAA"],
            ["8", "ACAoBIUoBAUAMQICAAAAAAAAAAAAECIh"],
            ["7", "AKAoAAEgBAUAShEGAAAIAQAEAAAAABQx"],
            ["6", "giIoAAAABAVRAAACACEAEAIAIAAQAgAh"],
            ["5", "QQEIQACAEASgAEAIIUAIEQKIEEKAAAIA"],
            ["4", "AABAhIFhgAAAcsIIAAAAAAAAAAAAEDOI"],
            ["3", "AGh5CEMwAAMAhAAFAAAAAAAAAAAAAIhS"],
            ["2", "DAMAQQiGAEAwAABAiFCEAEAIAIAgBQAA"],
            ["tutorial 2", "AAEgQQiGBIEgQAGgFAAgAAAgAEABoBQA"],
            ["tutorial 1", "wwCGEAzjDG/6kFKqFFKEAAIAAAAAAAAA"],
            ["1d", "wxyEDEMwQQjPIEAIAoQwwghijACGACAI"],
            ["1b", "RYG2YNu0aQugAAAAAAAAAAAAAAAAAAAA"],
            ["1", "RQEAQQUABAUACCEECCEAACCEECCAAAAA"],
        ],
    ],
];

const optionMap = new Map();
const allPuzzles = [];
for (const [set, puzzles] of puzzleSets) {
    for (const [name, puzzle] of puzzles) {
        allPuzzles.push(puzzle);
    }
}

const selectElement = document.getElementById("puzzles");
const gameElement = document.querySelector("svg");
const loadButton = document.querySelector("button.load");
const randomButton = document.querySelector("button.random");
const undoButton = document.querySelector("button.undo");
const redoButton = document.querySelector("button.redo");

for (const [set, puzzles] of puzzleSets) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = set;
    selectElement.appendChild(optgroup);
    for (const [name, puzzle] of puzzles) {
        const option = document.createElement("option");
        option.value = puzzle;
        option.innerText = `${set} - ${name}`;
        optionMap.set(puzzle, option);
        optgroup.appendChild(option);
    }
}
let unlistedGroup = null;
let selectedOption = null;

function updateSelected() {
    if (!optionMap.has(gameElement.dataset.puzzle)) {
        if (!unlistedGroup) {
            unlistedGroup = document.createElement("optgroup");
            unlistedGroup.label = "Unlisted Puzzles";
            selectElement.appendChild(unlistedGroup);
        }
        const option = document.createElement("option");
        option.value = gameElement.dataset.puzzle;
        option.innerText = `Unlisted Puzzle (${gameElement.dataset.puzzle.substring(0, 5)}...)`;
        optionMap.set(gameElement.dataset.puzzle, option);
        unlistedGroup.appendChild(option);
    }
    const newSelected = optionMap.get(gameElement.dataset.puzzle);
    newSelected.selected = true;
    if (selectedOption) {
        selectedOption.innerText = selectedOption.innerText.split("|")[0];
    }
    newSelected.innerText = newSelected.innerText + " | playing";
    selectedOption = newSelected;

    document.title = `Tango Player | ${selectedOption.innerText.split("|")[0]}`;
}
gameElement.addEventListener("puzzlechange", updateSelected);
updateSelected();

function askConfirmation() {
    if (undoButton.disabled && redoButton.disabled)
        return true;
    return confirm("Are you sure you want to load a new puzzle? All progress will be lost.");
}
loadButton.addEventListener("click", () => {
    if (!askConfirmation()) {
        return;
    }
    gameElement.dispatchEvent(new CustomEvent("updatepuzzle", {
        detail: selectElement.value,
    }));
});

randomButton.addEventListener("click", () => {
    if (!askConfirmation()) {
        return;
    }
    gameElement.dispatchEvent(new CustomEvent("updatepuzzle", {
        detail: allPuzzles[Math.floor(Math.random() * allPuzzles.length)],
    }));
});