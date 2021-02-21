window.addEventListener('load', async () => {
        if (window.ethereum) {
           window.web3 = new Web3(window.ethereum);
            try {
        // Request account access if needed
                  await window.ethereum.enable();
           // Acccounts now exposed
          } catch (error) {
        // User denied account access...
          console.log(error);
          }
         }
             // Legacy dapp browsers...
        else if (window.web3) {
               window.web3 = new Web3(web3.currentProvider);
                    // Acccounts always exposed

                   }
               // Non-dapp browsers...
               else {
              console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
               }



       const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "item",
        "type": "string"
      }
    ],
    "name": "AcceptOffer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "item",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "offerPrice",
        "type": "int256"
      }
    ],
    "name": "buy_item",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "Product_on_Sale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "item",
        "type": "string"
      }
    ],
    "name": "Reject",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_Sc",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "balance_of_contract",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "item_instanceOwner",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "item_state",
    "outputs": [
      {
        "internalType": "enum SimpleMarketplace.StateType",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "listed_products",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "item",
        "type": "string"
      }
    ],
    "name": "price",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "show_all_product",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "item",
        "type": "string"
      }
    ],
    "name": "trace_item",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
       const Caddr = "0xC2eAa6c0b99c6848fcD9d91dd18c5533b5b47204";
       const Contract = new web3.eth.Contract(abi, Caddr);
       console.log(Contract);

        $("#b1").click( async function(){
        const m = "item"
        let x = await Contract.methods.trace_item(m).call()

        const a_1 = x[0];
        const a_2 = x[1];
        const a_3 = x[2];
         console.log(a_1)

          $('p.p1').text(a_1[0] + " ----> " + a_1[1]);
          $('p.p2').text(a_2[0] + " ----> " + a_2[1]);
          $('p.p3').text(a_3[0] + " ----> " + a_3[1]);
         
        })

        $("#b2").click( async function(){

           alert("item added to the cart")


        })

})