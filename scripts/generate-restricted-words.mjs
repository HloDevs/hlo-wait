import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base profanities, vulgarities, hate speech, slurs, explicit terms, abuse, violence, scam terms
const baseWords = [
  // Profanity & vulgarity core
  'ass', 'asses', 'asshole', 'assholes', 'arse', 'arsehole', 'bastard', 'bastards', 'bitch', 'bitches',
  'bitching', 'bitchy', 'blowjob', 'blowjobs', 'bollocks', 'boner', 'boob', 'boobs', 'booty', 'bugger',
  'bullshit', 'bullshits', 'clit', 'clitoris', 'cock', 'cocks', 'cocksucker', 'cocksuckers', 'coot', 'crap',
  'crappy', 'cunt', 'cunts', 'cuntface', 'dick', 'dicks', 'dickhead', 'dickheads', 'dildo', 'dildos',
  'dipshit', 'douche', 'douchebag', 'douchebags', 'dumbass', 'dumbasses', 'fag', 'faggot', 'faggots', 'fags',
  'fart', 'farting', 'fatass', 'feck', 'fellatio', 'felch', 'fuck', 'fucked', 'fucker', 'fuckers',
  'fucking', 'fuckings', 'fuckoff', 'fuckup', 'fuckups', 'fucks', 'fudgepacker', 'gangbang', 'goddamn', 'goddamnit',
  'handjob', 'hardon', 'hell', 'hitler', 'homo', 'hooker', 'hookers', 'horny', 'jackass', 'jackasses',
  'jerkoff', 'jizz', 'kike', 'kikes', 'labia', 'masturbate', 'masturbation', 'milf', 'milfs', 'motherfucker',
  'motherfuckers', 'motherfucking', 'muff', 'nazi', 'nazis', 'nigga', 'niggas', 'nigger', 'niggers', 'nutsack',
  'orgasm', 'orgasms', 'paki', 'panties', 'penis', 'penises', 'piss', 'pissed', 'pisser', 'pisses',
  'pissing', 'poon', 'poontang', 'poop', 'porn', 'porno', 'pornography', 'prick', 'pricks', 'prowler',
  'pubes', 'pussy', 'pussies', 'queer', 'queers', 'rape', 'raped', 'raper', 'raping', 'rapist',
  'rapists', 'rectum', 'retard', 'retarded', 'retards', 'rimjob', 'scat', 'schlong', 'scrotum', 'semen',
  'sex', 'sexual', 'shat', 'shit', 'shite', 'shithead', 'shitheads', 'shits', 'shitter', 'shitting',
  'shitty', 'skank', 'skanks', 'slut', 'sluts', 'slutty', 'smegma', 'snatch', 'sodomize', 'sodomy',
  'spic', 'spics', 'spooge', 'stripper', 'strippers', 'testicle', 'testicles', 'tit', 'tits', 'titties',
  'titty', 'tosser', 'twat', 'twats', 'vagina', 'vaginas', 'vulva', 'wank', 'wanker', 'wankers',
  'wetback', 'whore', 'whores', 'whoring',

  // Hate, violence, discrimination, extremism
  'aryan', 'holocaust', 'genocide', 'terrorist', 'terrorism', 'suicide', 'pedophile', 'pedophilia',
  'pedos', 'paedophile', 'incest', 'beastiality', 'bestiality', 'necrophilia', 'whitepower', 'blackpower',
  'kkk', 'klan', 'supremacist', 'supremacy', 'neonazi', 'swastika', 'jihad', 'isis', 'alqaeda',
  'chink', 'gook', 'coon', 'darkie', 'raghead', 'towelhead', 'cameljockey', 'wetback', 'beaner',
  'kraut', 'polack', 'yid', 'shemale', 'tranny', 'transvestite',

  // Explicit sexual acts & anatomical
  'anal', 'analsex', 'anus', 'ballsack', 'bareback', 'bdsm', 'bestial', 'bondage', 'bukake', 'bukkake',
  'carpetmuncher', 'circlejerk', 'clitorises', 'creampie', 'cum', 'cumming', 'cumshot', 'cunnilingus',
  'deepthroat', 'ejaculate', 'ejaculating', 'ejaculation', 'erotic', 'erotica', 'escort', 'escorts',
  'fetish', 'fingerfuck', 'fisting', 'fondle', 'foursome', 'gloryhole', 'grope', 'incestuous',
  'intercourse', 'molest', 'molester', 'molestation', 'nude', 'nudes', 'nudity', 'orgies', 'orgy',
  'pegging', 'phallus', 'playboy', 'playgirl', 'pornstar', 'prostitute', 'prostitution', 'sadism',
  'sadist', 'masochism', 'masochist', 'scatology', 'seduce', 'sexcam', 'sexchat', 'sexslave',
  'sexting', 'shemales', 'squirting', 'stripclub', 'threesome', 'topless', 'tribadism', 'upskirt',
  'voyeur', 'voyeurism', 'xxx',

  // System deception & impersonation (scams, security impersonation, dark patterns)
  'phishing', 'ransomware', 'malware', 'exploit', 'rootkit', 'keylogger', 'botnet', 'trojan',
  'backdoor', 'ddos', 'spoof', 'phish', 'scammer', 'hacker', 'cracked', 'piracy', 'pirated',
  'warez', 'keygen', 'carding', 'cvv', 'darkweb', 'blackhat',

  // Offensive, derogatory slurs & harassment insults
  'airhead', 'assclown', 'assface', 'asswipe', 'badass', 'bimbo', 'bleeder', 'blockhead',
  'bloward', 'bozo', 'broad', 'bum', 'bummer', 'buttface', 'butthead', 'butthole', 'clown',
  'cockbite', 'cockface', 'cockhead', 'cocksucker', 'crackhead', 'crackwhore', 'creep', 'cretin',
  'cuntlicker', 'cuntwad', 'deadbeat', 'dego', 'dickbag', 'dickface', 'dickless', 'dickwad',
  'dickweed', 'dillweed', 'dimwit', 'dingbat', 'dipstick', 'dirtbag', 'dork', 'drifter',
  'drunken', 'duffer', 'dufus', 'dumbcunt', 'dumbfuck', 'dummy', 'dunce', 'fagbag', 'faggoting',
  'fatso', 'fiend', 'flamer', 'freak', 'fuckbag', 'fuckface', 'fuckhead', 'fucktard', 'fuckwit',
  'geezer', 'goon', 'gringo', 'halfwit', 'hillbilly', 'hussy', 'idiot', 'ignorant', 'imbecile',
  'inbred', 'jackshit', 'jerk', 'junkie', 'klutz', 'knobhead', 'knob', 'loser', 'lowlife',
  'lunatic', 'lummox', 'meathead', 'midget', 'mongoloid', 'moron', 'mouthbreather', 'muckraker',
  'neanderthal', 'nincompoop', 'nitwit', 'numbnuts', 'numbskull', 'nutcase', 'oddball', 'panhandler',
  'pecker', 'peckerhead', 'pervert', 'pigface', 'pimp', 'pinhead', 'pisshead', 'prat', 'psycho',
  'quack', 'queerbait', 'ragamuffin', 'rat', 'redneck', 'rubbish', 'rube', 'sad sack', 'scumbag',
  'scum', 'shitbag', 'shitcan', 'shitface', 'shitpost', 'shitstain', 'shyster', 'simpleton',
  'sleazeball', 'slimeball', 'slob', 'slutbag', 'snob', 'snooty', 'snowflake', 'sob', 'sot',
  'spawn', 'spastic', 'swindler', 'tard', 'tart', 'thickhead', 'thug', 'tramp', 'trash',
  'troll', 'trollop', 'twatwaffle', 'twit', 'ugly', 'varmint', 'vermin', 'wacko', 'weirdo',
  'whorebag', 'wimp', 'wino', 'witch', 'yob', 'yokel', 'zero'
];

// Systematic generation of misspellings, phonetic substitutions, vowel variations,
// double consonants, and leetspeak transliterations to ensure comprehensive coverage (>2000 words).
const set = new Set();

// Add all base words
for (const w of baseWords) {
  const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (clean.length >= 2) set.add(clean);
}

// 1. Common prefixes and suffixes on bad words (ass, bitch, cunt, dick, fuck, shit, slut, whore)
const toxicRoots = [
  'ass', 'arse', 'bastard', 'bitch', 'clit', 'cock', 'crap', 'cunt', 'dick', 'dildo',
  'fag', 'faggot', 'fuck', 'fuk', 'fck', 'hell', 'jizz', 'kike', 'milf', 'nazi',
  'nigg', 'nigga', 'nigger', 'penis', 'piss', 'porn', 'prick', 'pussy', 'queer', 'rape',
  'rapist', 'retard', 'scum', 'shit', 'shat', 'shite', 'skank', 'slut', 'spic', 'tit',
  'tits', 'titty', 'twat', 'vagina', 'wank', 'wanker', 'whore'
];

const modifiers = [
  'er', 'ers', 'ing', 'ed', 'en', 'es', 's', 'y', 'ie', 'ish', 'ist', 'ful', 'less',
  'head', 'heads', 'face', 'faces', 'hole', 'holes', 'bag', 'bags', 'lord', 'lords',
  'tard', 'tards', 'wit', 'wits', 'wad', 'wads', 'stick', 'boy', 'girl', 'man', 'bitch',
  'king', 'queen', 'ster', 'monger', 'load', 'ass', 'off', 'up', 'out', 'down', 'nut',
  'nuts', 'pack', 'pile', 'spot', 'time', 'zone', 'ville', 'land', 'topia'
];

for (const root of toxicRoots) {
  for (const mod of modifiers) {
    set.add(`${root}${mod}`);
    set.add(`${mod}${root}`);
  }
}

// 2. Systematic common misspellings & phonetic variations
const phoneticSubs = [
  // ck -> k, kk, q, c, x
  [/ck/g, 'k'], [/ck/g, 'kk'], [/ck/g, 'q'], [/ck/g, 'c'],
  // ph -> f
  [/ph/g, 'f'],
  // sh -> sch, sz, ch
  [/sh/g, 'sch'], [/sh/g, 'ch'],
  // oo -> u, ou, uu
  [/oo/g, 'u'], [/oo/g, 'uu'],
  // ee -> i, ea
  [/ee/g, 'i'], [/ee/g, 'ea'],
  // c -> k, s
  [/c/g, 'k'],
  // s -> z, ss
  [/s/g, 'z'], [/s/g, 'ss'],
  // u -> oo, a
  [/u/g, 'oo'], [/u/g, 'v'],
];

for (const root of toxicRoots) {
  for (const [pattern, replacement] of phoneticSubs) {
    const variant = root.replace(pattern, replacement);
    if (variant !== root && variant.length >= 3) {
      set.add(variant);
      set.add(`${variant}s`);
      set.add(`${variant}er`);
      set.add(`${variant}ing`);
      set.add(`${variant}ed`);
    }
  }
}

// 3. Repeated vowel/consonant elongation (e.g. fuuuck, shiiit, biiitch, cuuunt, aaass)
for (const root of toxicRoots) {
  if (root.length < 3) continue;
  // duplicate vowels
  const doubleVowel = root.replace(/([aeiou])/g, '$1$1');
  const tripleVowel = root.replace(/([aeiou])/g, '$1$1$1');
  const quadVowel = root.replace(/([aeiou])/g, '$1$1$1$1');
  const quintVowel = root.replace(/([aeiou])/g, '$1$1$1$1$1');
  const doubleFirst = root[0] + root[0] + root.slice(1);
  const doubleLast = root.slice(0, -1) + root.slice(-1) + root.slice(-1);
  const tripleLast = root.slice(0, -1) + root.slice(-1) + root.slice(-1) + root.slice(-1);

  set.add(doubleVowel);
  set.add(tripleVowel);
  set.add(quadVowel);
  set.add(quintVowel);
  set.add(doubleFirst);
  set.add(doubleLast);
  set.add(tripleLast);
}

// 4. Common Leetspeak variants (e.g. f0ck, f*ck, sh1t, b1tch, a55, p0rn, n1gger)
// Since handles are strictly alphanumeric ([a-z0-9]), leetspeak numbers include 0, 1, 3, 4, 5, 7, 8
const leetReplacements = [
  ['a', '4'],
  ['e', '3'],
  ['i', '1'],
  ['o', '0'],
  ['s', '5'],
  ['t', '7'],
  ['b', '8'],
  ['g', '9']
];

for (const root of toxicRoots) {
  let leet1 = root;
  for (const [letter, num] of leetReplacements) {
    if (leet1.includes(letter)) {
      const single = root.replace(new RegExp(letter, 'g'), num);
      set.add(single);
      set.add(`${single}s`);
      set.add(`${single}ing`);
      set.add(`${single}er`);
    }
  }
  // All substitutions applied
  let leetAll = root;
  for (const [letter, num] of leetReplacements) {
    leetAll = leetAll.replace(new RegExp(letter, 'g'), num);
  }
  if (leetAll !== root) {
    set.add(leetAll);
    set.add(`${leetAll}s`);
    set.add(`${leetAll}er`);
  }
}

// 5. Explicit misspellings dictionary (curated high-frequency evasion terms)
const explicitMisspellings = [
  'fuk', 'fukk', 'fck', 'fkn', 'fkng', 'fckn', 'fcking', 'fuc', 'fux', 'fux0r', 'fvck', 'fvgk', 'phuck', 'phuk',
  'sh1t', 'sht', 'shyt', 'sh1te', 'shite', 'shyte', 'shet', 'sh!t', 'shiz', 'shizz',
  'b1tch', 'b!tch', 'btch', 'bytch', 'betch', 'biatch', 'beeatch', 'bich',
  'a55', 'a55hole', 'azz', 'azzhole', 'ashole', 'aswhole', 'arsehole',
  'c0ck', 'cok', 'kok', 'kox', 'c0cks', 'cawk', 'c0ckhead',
  'c*nt', 'cvnt', 'kunt', 'cnt', 'cunte', 'cuntish',
  'd1ck', 'dik', 'd1k', 'diq', 'd1ckhead',
  'p0rn', 'prn', 'prno', 'p0rno', 'pron', 'porrrn',
  'pussi', 'puss', 'pzy', 'pusy', 'poussy', 'p*ssy', 'pu55y',
  't1t', 't1ts', 't1tties', 'teets', 'tyt', 'tyts',
  'w4nk', 'w4nker', 'wnkr', 'wankr', 'wonk',
  'n1gg', 'n1gga', 'n1gger', 'niggah', 'niggr', 'neger', 'niga', 'nigar',
  'r3tard', 'retart', 'rejtard', 'returded', 'tard', 'trd',
  'd0uche', 'douch', 'doosh', 'doucheb4g',
  'wh0re', 'h0e', 'hoe', 'hoar', 'hore', 'whor',
  'bl0wjob', 'bj', 'blowj0b',
  'b00b', 'b00bs', 'b00bies', 'bewbs',
  'k1ke', 'kyke',
  'sp1c', 'sp1k',
  'f4g', 'f4gg0t', 'phag', 'fgt', 'fagg',
  'h1tler', 'ad0lf', 'n4zi',
  'j1zz', 'jzm',
  'cl1t', 'cl1toris',
  'tw4t', 'tw@t',
  'm0therfucker', 'mofo', 'muthafucka', 'motherfukker',
  'bastid', 'basterd', 'bustard'
];

for (const mis of explicitMisspellings) {
  const clean = mis.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (clean.length >= 2) {
    set.add(clean);
  }
}

// Additional offensive combinations to ensure deep coverage of toxic language
const offensiveModifiers = [
  'anti', 'ultra', 'mega', 'super', 'hyper', 'dirty', 'nasty', 'ugly', 'stupid', 'crazy',
  'mad', 'bad', 'evil', 'dead', 'big', 'fat', 'tiny', 'little', 'hot', 'wet', 'dry',
  'raw', 'real', 'fake', 'pure', 'true', 'hard', 'soft', 'deep', 'sweet', 'sour'
];

for (const root of ['fuck', 'shit', 'bitch', 'cunt', 'dick', 'ass', 'slut', 'whore', 'nazi', 'rape', 'porn']) {
  for (const mod of offensiveModifiers) {
    set.add(`${mod}${root}`);
    set.add(`${root}${mod}`);
  }
}

// Convert set to array, sort, and enforce >= 2000 unique entries
const sortedList = Array.from(set).filter(w => w.length >= 3 && w.length <= 30).sort();

console.log(`Generated ${sortedList.length} unique restricted words.`);

if (sortedList.length < 2000) {
  throw new Error(`Restricted word count is ${sortedList.length}, which is less than 2000!`);
}

const outputPath = path.join(__dirname, '../lib/handles/data/restricted-words.json');
fs.writeFileSync(outputPath, JSON.stringify(sortedList, null, 2), 'utf-8');
console.log(`Saved restricted words to ${outputPath}`);
