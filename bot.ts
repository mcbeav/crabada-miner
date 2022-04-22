import {Token as JOEToken, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } from "@traderjoe-xyz/sdk";
import { ethers } from "ethers";

let TeleBot = require("telebot");

require('dotenv').config();

const KEY = String(process.env.KEY);
const WALLET = new ethers.Wallet(KEY);
const AVALANCHE = new ethers.providers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc"); 
const CONNECTION = WALLET.connect(AVALANCHE);
const CRABADA = "0x82a85407BD612f52577909F4A58bfC6873f14DA8";
const ADDRESS = String(process.env.ADDRESS);
const CRABS = String(process.env.TEAMS).split( "," );
const TELEGRAM = String(process.env.TELEGRAM);
const API = String(process.env.API);
const USERNAME = String(process.env.USERNAME);

const tokenABI = [{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const routerABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WAVAX","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WAVAX","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAXSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapAVAXForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAXSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]; 

const USDC_token = new ethers.Contract('0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', tokenABI, AVALANCHE);
const TUS_token = new ethers.Contract('0xf693248F96Fe03422FEa95aC0aFbBBc4a8FdD172', tokenABI, AVALANCHE);
const CRA_token = new ethers.Contract('0xA32608e873F9DdEF944B24798db69d80Bbb4d1ed', tokenABI, AVALANCHE);
const WAVAX = new JOEToken(43114, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', 18, "WAVAX", "Wrapped AVAX");
const USDC = new JOEToken(43114, '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', 6, "USDC", "USDC");
const TUS = new JOEToken(43114, '0xf693248F96Fe03422FEa95aC0aFbBBc4a8FdD172', 18, "TUS", "TUS");
const CRA = new JOEToken(43114, '0xA32608e873F9DdEF944B24798db69d80Bbb4d1ed', 18, "CRA", "CRA");

const traderJOE = new ethers.Contract(
    '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
    routerABI,
    AVALANCHE
);

var mining = false;
var running = false;
var ii = 0;
var TEAMS = [] as any;

CRABS.forEach( ( id, index ) => {
    let team =
        {
            id: id,
            index: index,
            mining: false,
            close: ""
        }
    TEAMS.push( team );
});

function mine() {
    if( running ) {
        if( !mining ) {
            if( ii < TEAMS.length ) {
                start( TEAMS[ ii ] )
                    .then( () => {
                        ii++;
                    })
                    .catch( ( err ) => {
                        console.log( `Err: ${err}` );
                    })
                    .finally( () => {
                        mine();
                    });
            } else {
                mining = true;
                ii = 0;
                var timer = setTimeout( () => { mine();}, 14450000 );
            }
        } else {
            if( ii < TEAMS.length ) {
                close( TEAMS[ ii ] )
                    .then( () => {
                        ii++;
                    })
                    .catch( ( err ) => {
                        console.log( `Err: ${err}` );
                    })
                    .finally( () => {
                        mine();
                    });
            } else {
                mining = false;
                ii = 0;
                mine();
            }
        }
    }
}

async function start( team ) {
    let transaction = {
        data: team.id,
        to: CRABADA,
        value: 0,
        from: ADDRESS,
    };
    let txn = (await CONNECTION.sendTransaction(transaction));
    let hash = txn.hash;
    let receipt = await AVALANCHE.waitForTransaction(String(hash));
    let game = receipt.logs[0].data.slice(2,66);
    TEAMS[ ii ].close = '0x2d6ef310' + game;
    let URL = 'https://snowtrace.io/tx/' + (hash);
    bot.sendMessage(TELEGRAM,`Game Started (Team ${ii + 1})\n${URL}`);
}

async function close( team ) {
    let transaction = {
        data: team.close, 
        to: CRABADA,
        value: 0,
        from: ADDRESS,
    };
    let txn = (await CONNECTION.sendTransaction(transaction));
    let hash = txn.hash;
    let receipt = await AVALANCHE.waitForTransaction(String(hash));
    let URL = 'https://snowtrace.io/tx/' + (hash);
    bot.sendMessage(TELEGRAM,`Game Closed (Team ${ii + 1})\n${URL}`);
}

async function getWalletBalance() {
    let USDC_balance = (await USDC_token.balanceOf(ADDRESS));
    let TUS_balance = (await TUS_token.balanceOf(ADDRESS));
    let CRA_balance = (await CRA_token.balanceOf(ADDRESS));
    
    return [String(USDC_balance), String(TUS_balance), String(CRA_balance)]
}

async function checkTradePrice(amount,token) { 
    let WAVAXUSDCPair = await Fetcher.fetchPairData(WAVAX, USDC, AVALANCHE);
    let WAVAXTUSPair = await Fetcher.fetchPairData(WAVAX, TUS, AVALANCHE);
    let WAVAXCRAPair = await Fetcher.fetchPairData(WAVAX, CRA, AVALANCHE);
    let route;

    let amountIn = amount.toString();
    if (token == 'TUS') {
      token = TUS;
      route = new Route([WAVAXTUSPair, WAVAXUSDCPair], TUS);
    } else if (token == 'CRA') {
      token = CRA
      route = new Route([WAVAXCRAPair, WAVAXUSDCPair], CRA);
    }
    let trade = new Trade(
      route,
      new TokenAmount(token, amountIn),
      TradeType.EXACT_INPUT,
      43114
    );
  
    let slippageTolerance = new Percent("50", "10000");
    let amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
    let value = trade.inputAmount.raw;
    
    console.log(Number(amountOutMin));
    
    return ([amountOutMin,value]);
}

async function tradeonAVAX(amountIn, amountOutMin, path, gas) {
    let router = traderJOE.connect(CONNECTION);
    let to = ADDRESS;
    let deadline = Math.floor(Date.now() / 1000) + 60 * 3;
    console.log('amountin',amountIn);
    if (gas === false) {
        let txn = await router.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
          )
        await txn.wait();
    } else {
        let txn = await router.swapExactTokensForAVAX(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
          )
        await txn.wait();
    }
}

async function swapTUS() {
    let [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();
    console.log(TUS_balance);
    let [amountOutMin,value] = await checkTradePrice(String(TUS_balance), 'TUS');
    console.log((TUS_balance));
    await tradeonAVAX(TUS_balance, String(amountOutMin), ['0xf693248F96Fe03422FEa95aC0aFbBBc4a8FdD172','0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7','0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664'], false);
}

async function swapCRA() {
    let [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();
    let [amountOutMin,value] = await checkTradePrice(String(CRA_balance), 'CRA');
    await tradeonAVAX(CRA_balance, String(amountOutMin), ['0xA32608e873F9DdEF944B24798db69d80Bbb4d1ed','0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7','0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664'], false);
}

async function swapforGas() {
    let [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();
    let [amountOutMin,value] = await checkTradePrice(String(Number(TUS_balance) * 0.1), 'TUS');
    await tradeonAVAX(String(Number(TUS_balance) * 0.1), String(amountOutMin), ['0xf693248F96Fe03422FEa95aC0aFbBBc4a8FdD172','0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'], true);
}

async function displayBalance() {
    let [USDC_balance, TUS_balance, CRA_balance] = await getWalletBalance();
    
    let USDCbalance = Number(USDC_balance) / 10**6;
    let TUSbalance = Number(TUS_balance) / 10**18;
    let CRAbalance = Number(CRA_balance) / 10**18;
    bot.sendMessage(TELEGRAM,`USDC Balance:${USDCbalance}\nTUS Balance:${TUSbalance}\nCRA Balance:${CRAbalance}`).catch(error => console.log(error));
}

let bot = new TeleBot(API);

bot.on('/start', (msg) => {
    if (String( msg.from.username ).toLowerCase() === String(USERNAME).toLowerCase()) {
        if( !running ) {
            running = true;
            mine();
        }
    } else {
        bot.sendMessage(TELEGRAM,`Error: No Access`).catch(error => console.log(error));
    }
});

bot.on( '/pause', (msg) => {
    if (String( msg.from.username ).toLowerCase() === String(USERNAME).toLowerCase()) {
        if( running ) {
            running = false;
        }
    } else {
        bot.sendMessage(TELEGRAM,`Error: No Access`).catch(error => console.log(error));
    }
})

bot.on('/swapTUS', (msg) => {
    if (String( msg.from.username ).toLowerCase() === String(USERNAME).toLowerCase()) {
        swapTUS();
        displayBalance();
    } else {
        bot.sendMessage(TELEGRAM,`Error: No Access`).catch(error => console.log(error));
    }
})

bot.on('/swapCRA', (msg) => {
    if (String( msg.from.username ).toLowerCase() === String(USERNAME).toLowerCase()) {
        swapCRA();
        displayBalance();
    } else {
        bot.sendMessage(TELEGRAM,`Error: No Access`).catch(error => console.log(error));
    }
})

bot.on('/swapgas', (msg) => {
    if (String( msg.from.username ).toLowerCase() === String(USERNAME).toLowerCase()) {
        swapforGas();
        displayBalance();
    } else {
        bot.sendMessage(TELEGRAM,`Error: No Access`).catch(error => console.log(error));
    }
})

bot.on('/balance', (msg) => {
    if (String( msg.from.username ).toLowerCase() === String(USERNAME).toLowerCase()) {
        displayBalance();
    } else {
        bot.sendMessage(TELEGRAM,`Error: No Access`).catch(error => console.log(error));
    }
})

bot.start();