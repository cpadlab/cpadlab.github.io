---
title: 'All my solutions to MiduDev’s AdventJS 2024 | 25 Python, JavaScript and TypeScript Programming Challenges'
date: 'Dec 26, 2024'
description: 'Discover my 25 solutions to MiduDev’s AdventJs 2024 challenges.'
category: 'Article'
cover: 'https://i.postimg.cc/jjmqT3Th/1-WZ8-KVFVJOd-GVu6uv9-TI7w.webp'
tags: ['AdventJS', 'MiduDev']
---

Advent has come to an end! So I would like to take this opportunity to wish you all a very **Merry Christmas**. During this time, I have dedicated myself to programming. I have resumed the development of my [website](https://cpadlab.github.io/), which I will be sharing soon, and also, I had the pleasure to participate for the first time in the **AdventJS**, an event organized by [midudev](https://medium.com/u/1b78a7ec4768?source=post_page---user_mention--bf1f0bcdbde7---------------------------------------) every year since 2020.

![MiduDev’s AdventJS 2024 Carlos Padilla Results Table](https://i.postimg.cc/jjmqT3Th/1-WZ8-KVFVJOd-GVu6uv9-TI7w.webp)

In this article I will share all my answers, from day 1 to day 25, of the challenge. However, if you prefer, you can go directly to the [repository I created on GitHub](https://github.com/cpadlab/AdventJS), don’t forget to leave a star if you like it!

Before we start, I would like to comment that there are a total of 25 challenges, which will give you 102 stars out of 125, covering all the basic achievements, but only some of the pro and secret achievements. Also, 16 of the challenges are programmed in Python, 5 in TypeScript (for the achievements) and 7 in JavaScript.

Let’s start!

---

## Challenge #1: 🎁 First gift repeated!

Santa gives us 5 stars, and we solved it in Python and TypeScript.

```
function prepareGifts(gifts: number[]): number[] {
    return Array.from(new Set(gifts)).sort((a, b) => a - b);
}
```

```
def prepare_gifts(gifts):
    return sorted(set(gifts))
```

![](https://i.postimg.cc/6QRwjTbZ/1-fadd-w-Lp-USa6-WDw-Edr-LW9-A.webp)

---

## Challenge #2: 🖼️ Framing names

Santa gives us 5 stars, and we solved it in Python.

```
def createFrame(names):
    max_length = max(len(name) for name in names)
    border = '*' * (max_length + 4)
    return '\n'.join([border] + [f"* {name.ljust(max_length)} *" for name in names] + [border])
```

![](https://i.postimg.cc/KYnS7w4r/1-ade-Vp-Y0k-DSLh-A38-Tlmr-Iz-A.webp)

---

## Challenge #3: 🏗️ Organizing the inventory

Santa gives us 4stars, and we solved it in Python.

```
def organizeInventory(inventory):
    
    organized = {}
    
    for item in inventory:
        
        category = item['category']
        name = item['name']
        quantity = item['quantity']
        
        if category not in organized:
            organized[category] = {}

        if name in organized[category]:
            organized[category][name] += quantity

        else:
            organized[category][name] = quantity
    
    return organized
```

![](https://i.postimg.cc/RZHj9y15/1-r-Gm3-C-Z60lj-N42-Tb-AEqvu-Q.webp)

---

## Challenge #4: 🎄 Decorating the Christmas tree

Santa gives us 5 stars, and we solved it in Python and JavaScript.

```
function organizeInventory(inventory) {
    
    const organized = {};
  
    inventory.forEach(item => {
        if (!organized[item.category]) {organized[item.category] = {};}  
        if (!organized[item.category][item.name]) {organized[item.category][item.name] = 0;}
        organized[item.category][item.name] += item.quantity;

    });
  
    return organized;
}
```

```
def create_xmas_tree(height, ornament):
    
    tree = ''

    for i in range(1, height + 1):
        
        spaces = '_' * (height - i)
        tree += spaces + ornament * (2 * i - 1) + spaces + '\n'

    trunk = '_' * (height - 1) + '#' + '_' * (height - 1)
    tree += trunk + '\n'
    tree += trunk

    return tree
```

![](https://i.postimg.cc/GpqXZvxd/1-vcu9lq-KC-n-Rn-XWCYhj-NMYQ.webp)

## Challenge #5: 👞 Shoe pairing

Santa gives us 4 stars, and we solved it in Python.

```
def organizeShoes(shoes):

    shoe_pairs = {}
    
    for shoe in shoes:
        size = shoe['size']
        type_ = shoe['type']
        
        if size not in shoe_pairs:
            shoe_pairs[size] = {'I': 0, 'R': 0}
        shoe_pairs[size][type_] += 1
    
    result = []
    for size, counts in shoe_pairs.items():    
        pairs = min(counts['I'], counts['R'])
        result.extend([size] * pairs)
    
    return sorted(result)
```

![](https://i.postimg.cc/htr8jxZw/5.webp)

## Challenge #6: 📦 Is the gift inside the box?


Santa gives us 5stars, and we solved it in Python and TypeScript.

```
def inBox(box):
    
    found = False
    
    for i in range(1, len(box)-1):
        for j in range(1, len(box[i])-1):
            if box[i][j] == '*':
                found = True                
                if '#' not in [box[i-1][j], box[i+1][j], box[i][j-1], box[i][j+1]]:
                    return False
    
    return found
```

```
function inBox(box: string[]): boolean {
    for (let i = 1; i < box.length - 1; i++) {
        const line: string = box[i]
        const j: number = line.indexOf('*');    
        
        if(j !== 0 && j !== line.length - 1 && j !== -1 ){
            return true
        }
    }

    return false
}
```

![](https://i.postimg.cc/k4VWfHM3/6.webp)

## Challenge #7: 👹 The Grinch’s attack

Santa gives us 1 stars, and we solved it in Python.

```
def fix_packages(packages):
    
    if '(' not in packages:
        return packages
    
    start = packages.rindex('(')
    count = 1
    end = start + 1
    
    while count > 0 and end < len(packages):
        if packages[end] == '(':
            count += 1
        elif packages[end] == ')':
            count -= 1
        end += 1
    
    before = packages[:start]
    inside = packages[start + 1:end - 1][::-1]
    after = packages[end:]
    
    return fix_packages(before + inside + after)
```

![](https://i.postimg.cc/fbqx7sNf/7.webp)

## Challenge #8: 🦌 The reno race

Santa gives us 5 stars, and we solved it in JavaScript.

```
function drawRace(indices, length) {
    
    let result = [];
    let lengthRace = "~".repeat(length).split("");

    for (let i = 0; i < indices.length; i++) {
        let space = " ".repeat(indices.length - (i + 1));
        let copy = [...lengthRace];
        if (indices[i] != 0) {copy.splice(indices[i], 1, "r");}
        let position = copy.join("");
        let number = ` /${i + 1}`;
        result.push(`${space}${position}${number}`);
    }

    return result.join("\n"); 
}
```

![](https://i.postimg.cc/XvYfyJTv/8.webp)

## Challenge #9: 🚂 The magic train

Santa gives us 1 stars, and we solved it in Python.

```
from typing import List, Literal

def moveTrain(board: List[str], mov: Literal['U', 'D', 'R', 'L']) -> Literal['none', 'crash', 'eat']:
  
    for i, row in enumerate(board):
        if '@' in row:
            x, y = i, row.index('@')
            break

    if mov == 'U':new_x, new_y = x - 1, y
    elif mov == 'D':new_x, new_y = x + 1, y
    elif mov == 'L':new_x, new_y = x, y - 1
    elif mov == 'R':new_x, new_y = x, y + 1

    if new_x < 0 or new_x >= len(board) or new_y < 0 or new_y >= len(board[0]):return 'crash'
    if board[new_x][new_y] in ['@', 'o']:return 'crash'

    if board[new_x][new_y] == '*':return 'eat'

    return 'none'
```

![](https://i.postimg.cc/wMmcTGnc/9.webp)

## Challenge #10: 👩‍💻 The elfish assembler

Santa gives us 4 stars, and we solved it in JavaScript.

```
function compile(instructions) {
    
    const registers = {};
    let i = 0;

    while (i < instructions.length) {

        const instruction = instructions[i];
        const parts = instruction.split(' ');
    
        switch (parts[0]) {

            case 'MOV':
                const value = isNaN(parts[1]) ? (registers[parts[1]] || 0) : parseInt(parts[1], 10);
                registers[parts[2]] = value;
                break;
    
            case 'INC':
                const regInc = parts[1];
                registers[regInc] = (registers[regInc] || 0) + 1;
                break;
    
            case 'DEC':
                const regDec = parts[1];
                registers[regDec] = (registers[regDec] || 0) - 1;
                break;
    
            case 'JMP':
                const regJmp = parts[1];
                const indexJmp = parseInt(parts[2], 10);
                if ((registers[regJmp] || 0) === 0) {
                    i = indexJmp;continue;
                }

            break;
        }

        i++;
    }
    
    return registers['A'] !== undefined ? registers['A'] : undefined;

}
```

![](https://i.postimg.cc/T2zJHTWk/10.webp)

## Challenge #11: 🏴‍☠️ Filenames encoded

Santa gives us 5 stars, and we solved it in Python.

```
import re

def decode_filename(filename: str) -> str:
    match = re.search(r'(\d+_)([\w_-]+\.[a-zA-Z]+)', filename)
    if match:return match.group(2)
```

![](https://i.postimg.cc/vBjtys2Z/11.webp)

## Challenge #12: 💵 How much does the tree cost?

Santa gives us 3 stars, and we solved it in Python.

```
def calculatePrice(ornaments):

    values = { '*': 1, 'o': 5, '^': 10, '#': 50, '@': 100 }
    
    total = 0
    i = 0
    
    while i < len(ornaments):
        
        if ornaments[i] not in values:return 'undefined'
            
        current_value = values[ornaments[i]]
        
        if i + 1 < len(ornaments) and ornaments[i + 1] in values:
            if values[ornaments[i + 1]] > current_value:total -= current_value
            else:total += current_value
        else:total += current_value
            
        i += 1
        
    return total
```

![](https://i.postimg.cc/mZzSwPhz/12.webp)

## Challenge #13: 🤖 Is the robot back?

Santa gives us 5 stars, and we solved it in JavaScript.

```
function isRobotBack(moves) {
 
    let axisX = 0;
    let axisY = 0;
    const movesComplement = { "R": "L", "L": "R", "D": "U", "U": "D",};
    const movesMade = {};

    const moveTo = {
        'R': (i, movQty = 1, jmp = movQty) => {
            movesMade['R'] = true;
            axisX += movQty;
            return i + jmp;
        },
        'L': (i, movQty = 1, jmp = movQty) => {
            movesMade['L'] = true;
            axisX -= movQty;
            return i + jmp;
        },
        'U': (i, movQty = 1, jmp = movQty) => {
            movesMade['U'] = true;
            axisY += movQty;
            return i + jmp;
        },
        'D': (i, movQty = 1, jmp = movQty) => {
            movesMade['D'] = true;
            axisY -= movQty;
            return i + jmp;
        },
        '*': function (i) {return this[moves[i + 1]](i, 2);},
        '!': function (i) {return this[movesComplement[moves[i + 1]]](i, 1, 2);},
        '?': function (i) {
            const isDone = movesMade[moves[i + 1]];
            return !isDone ? this[moves[i + 1]](i, 1, 2) : i + 2;
        }
    };

    let i = 0;
    while (i < moves.length) {i = moveTo[moves[i]](i);}
    return (!axisX && !axisY) || [axisX, axisY];
}
```

![](https://i.postimg.cc/nL31d7v7/13.webp)

## Challenge #14: 🦌 Weaving the reno

Santa gives us 5 stars, and we solved it in Python.

```
def min_moves_to_stables(reindeer, stables):
    
    reindeer.sort()
    stables.sort()
    
    total_moves = 0
    for r, s in zip(reindeer, stables):
        total_moves += abs(r - s)
    
    return total_moves
```

![](https://i.postimg.cc/9fmpt1qC/14.webp)

## Challenge #15: ✏️ Drawing tables


Santa gives us 2 stars, and we solved it in Python.

```
def draw_table(data: list[dict[str, str | int]]) -> str:

    columns = list(data[0].keys())
    max_lengths = {col: len(col.capitalize()) for col in columns}

    for row in data:
        for col in columns:max_lengths[col] = max(max_lengths[col], len(str(row[col])))

    def format_row(row: list[str]) -> str:return "| " + " | ".join(f"{val.ljust(max_lengths[col])}" for val, col in zip(row, columns)) + " |"
    separator = "+" + "+".join("-" * (max_lengths[col] + 2) for col in columns) + "+"

    return "\n".join([separator, format_row([col.capitalize() for col in columns]), separator] + [format_row([str(row[col]) for col in columns]) for row in data] + [separator])
```

![](https://i.postimg.cc/rwCjr7sf/15.webp)

## Challenge #16: ❄️ Cleaning the snow path

Santa gives us 5 stars, and we solved it in Python.

```
def remove_snow(s: str) -> str:
    stack = []

    for char in s:
        if stack and stack[-1] == char:stack.pop()
        else:stack.append(char)

    return "".join(stack)
```

![](https://i.postimg.cc/QdrSVj8B/16.webp)

## Challenge #17: 💣 Grinch’s bombs


Santa gives us 4 stars, and we solved it in JavaScript.

```
function detectBombs(grid) {
    
    const result = [];
    const parsedValue = { true: 1, false: 0, undefined: 0 };

    for (let i = 0; i < grid.length; i++) {
        for (let j=0; j<grid[0]?.length; j++) {
            
            result[i] = result[i] ?? [];

            const ySide = parsedValue[grid[i-1]?.[j]] + parsedValue[grid[i+1]?.[j]];
            const xSide = parsedValue[grid[i]?.[j-1]] + parsedValue[grid[i]?.[j+1]];
            const upperDiagonal = parsedValue[grid[i-1]?.[j-1]] + parsedValue[grid[i-1]?.[j+1]];
            const lowerDiagonal = parsedValue[grid[i+1]?.[j-1]] + parsedValue[grid[i+1]?.[j+1]];

            result[i][j] = ySide + xSide + upperDiagonal + lowerDiagonal;
        }
    }

    return result;

}
```

![](https://i.postimg.cc/Wtc3TFw1/17.webp)

## Challenge #18: 📇 Santa’s Magic Agenda

Santa gives us 4 stars, and we solved it in TypeScript.

```
function findInAgenda(agenda: string, phone: string): { name: string; address: string } | null {

    const registers = agenda.split('\n')
    const phoneRegex = /\+([0-9]|-)*/gm
    const nameRegex = /<+([a-zA-Z]|\s)*>/g
    const result: {name: string, address: string}[] = []
  
    registers.forEach((register, i) => {
        
        let phoneMatch = register.match(phoneRegex)
        let nameMatch = register.match(nameRegex)
        let p = phoneMatch == null ? null : phoneMatch![0]
        let n = nameMatch == null ? null : nameMatch![0].slice(1, nameMatch![0].length - 1)
        let a = register.replace(p!, '').replace(`<${n!}>`, '').trim()
  
        if(p?.includes(phone)) {result.push({ name: n!, address: a! })}

    })
  
    if(result.length !== 1) {return null}
    return result[0]
}
```

![](https://i.postimg.cc/7PdK8gjn/18.webp)

## Challenge #19: 📦 Stack magical boxes to deliver gifts

Santa gives us 2 stars, and we solved it in TypeScript.

```
type BoxRepresentations = {
    1: string[]
    2: string[]
    5: string[]
    10: string[]
}
  
function distributeWeight(weight: number): string {

    const weights = [10, 5, 2, 1]
    const boxRepresentations: BoxRepresentations = { 1: [" _ ", "|_|"] , 2: [" ___ ", "|___|"], 5: [" _____ ", "|     |", "|_____|"], 10: [" _________ ", "|         |", "|_________|"] }
    let remainingWeight = weight
    let boxes: (keyof BoxRepresentations)[] = []
  
    for (let i = 0; i < weights.length; i++) {
        if(weights[i] <= remainingWeight) {
            remainingWeight -= weights[i]
            boxes.push(weights[i] as keyof BoxRepresentations)
            i = -1
        }
    }
  
    boxes.reverse()
  
    if(boxes.length <= 1) {return boxRepresentations[boxes[0] as keyof BoxRepresentations].join('\n')}
  
    let result: string = ''

    console.log('boxes length', boxes.length)

    for (let i = 0; i < boxes.length; i++) {
        const currentBox = [...boxRepresentations[boxes[i]]]
        if(boxRepresentations[boxes[i + 1]]) {
            
            const nextBox = [...boxRepresentations[boxes[i + 1]]]
            currentBox[currentBox.length - 1] += nextBox[0].slice(currentBox[currentBox.length - 1].length)
            nextBox.shift()
            
            if(i > 0) {currentBox.shift()}

            currentBox[currentBox.length - 1] = currentBox[currentBox.length - 1].trim()
            let currentBoxStr = currentBox.join('\n')
            result += currentBoxStr + '\n'

        } else {
            currentBox.shift()
            let currentBoxStr = currentBox.join('\n')
            result += currentBoxStr
        }
    }
    
    return result
}
```

![](https://i.postimg.cc/L4nxbyQs/19.webp)

## Challenge #20: 🎁 Find missing and duplicate gifts

Santa gives us 5 stars, and we solved it in Python.

```
def fix_gift_list(received: list[str], expected: list[str]) -> dict[str, int]:
    
    received_count = {}
    expected_count = {}
    
    for gift in received:received_count[gift] = received_count.get(gift, 0) + 1
    for gift in expected:expected_count[gift] = expected_count.get(gift, 0) + 1
    
    missing = {}
    extra = {}
    
    for gift in expected_count:
        expected_qty = expected_count[gift]
        received_qty = received_count.get(gift, 0)
        
        if received_qty < expected_qty:missing[gift] = expected_qty - received_qty
            
    for gift in received_count:
        received_qty = received_count[gift]
        expected_qty = expected_count.get(gift, 0)
        
        if received_qty > expected_qty:extra[gift] = received_qty - expected_qty
    
    return { "missing": missing, "extra": extra }
```

![](https://i.postimg.cc/Qx70XF3G/20.webp)

## Challenge #21: 🎄 Calculate the height of the Christmas tree

Santa gives us 3 stars, and we solved it in Python.

```
def tree_height(tree):
    if tree is None:return 0
    if tree.get('left') is None and tree.get('right') is None:return 1
    return max(tree_height(tree.get('left')), tree_height(tree.get('right'))) + 1
```

![](https://i.postimg.cc/s2Tv72sT/21.webp)

## Challenge #22: 🎁 Generate gift combinations

Santa gives us 5 stars, and we solved it in Python.

```
def generate_gift_sets(gifts):

    result = [];n = len(gifts)
    
    def backtrack(start, current_combination):
        
        if len(current_combination) > 0:result.append(current_combination[:])
        
        for i in range(start, n):
            current_combination.append(gifts[i])
            backtrack(i + 1, current_combination)
            current_combination.pop()
    
    backtrack(0, []);result.sort(key=len)

    return result
```

![](https://i.postimg.cc/BbK6rcDz/22.webp)

## Challenge #23: 🔢 Find the missing numbers

Santa gives us 5 stars, and we solved it in TypeScript.

```
function findMissingNumbers(nums: number[]): number[] {
    const limit:number = Math.max(...nums);
    let values = new Array(limit).fill(0).map((_,i) => i + 1)    
    
    const c1 = new Set(nums)
    const c2 = new Set(values)

    return [...c2.difference(c1)]
}
```

![](https://i.postimg.cc/50GyKkHv/23.webp)

## Challenge #24: 🪞 Check if trees are magical mirrors

Santa gives us 5 stars, and we solved it in JavaScript.

```
function isTreesSynchronized(tree1, tree2) {
    
    if (!tree1) {return [true, ''];}
    if (tree1.value !== tree2.value) {return [false, tree1.value];}

    const sinc1 = isTreesSynchronized(tree1.left, tree2.right)[0];
    const sinc2 = sinc1 && isTreesSynchronized(tree1.right, tree2.left)[0];

    return [sinc1 && sinc2, tree1.value];
}
```

![](https://i.postimg.cc/XJXX80v4/24.webp)

## Challenge #25: 🪄 Execute the magical language

Santa gives us 4 stars, and we solved it in JavaScript.

```
function execute(code) {
    let acc = 0
    
    const processCode = (block) => {
        let i = 0;
        while (i < block.length) {
            const curr = block[i];

            if (curr === '+') {acc++;
            } else if (curr === '-') {acc--;
            } else if (curr === '[') {
                const end = block.indexOf(']', i);
                const newCode = block.slice(i + 1, end);
                while (acc !== 0) {processCode(newCode);}
                i = end;
            } else if (curr === '{') {
                if (acc === 0) {i = block.indexOf('}', i);}
            }
            i++;
        }
    };

    code = code.replaceAll('>', '');
    processCode(code);

    return acc
}
```

![](https://i.postimg.cc/cJxvv3yK/25.webp)

If you’ve made it this far, thank you very much! I leave you again the link to the repository with all the scripts. Also, I invite you to give the article a thumbs up and a [star to the repository](https://github.com/cpadlab/AdventJS), it’s much appreciated!

<3 Carlos