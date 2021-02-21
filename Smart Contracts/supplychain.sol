pragma solidity 0.6;
pragma experimental ABIEncoderV2;

contract Supplychain{
    
    address public Owner;
    address public vendor;
    address [] listed_Holder;
    enum transition_state{
        out_for_delivery,
        item_received
        
    }
    
    struct state{
         
         address holder;
         address next_holder;
         string itemId;
         uint arriT;
         uint shipT;
         string location;
         }
         
    mapping(string => state) public current_state;
    mapping(string => state []) history;
    mapping(address => bool)  active_holder;
    
    modifier onlyOwner{
        msg.sender == Owner;
        _;
    }
    
    modifier onlyVendor(){
        require(msg.sender == vendor);
        _;
    }
    modifier onlyHolder(address hold){
        
        for(uint i = 0; i<listed_Holder.length; i++){
            if(hold != listed_Holder[i]){
                revert("holder not registerd");
            }
            
        }
        _;
        
    }
    
    event item_received( uint arrivT, string itemid, transition_state);
    event item_shipped(address to, uint shipT, string itemId, string to_location, transition_state );
    
    constructor ( address _vendor) public {
        Owner = msg.sender;
        vendor = _vendor;
        active_holder[Owner] = true;
        active_holder[vendor] = true;
    
        listed_Holder.push(Owner);

        
    }
    
    
    function ship_to_Next(string memory item, address next_holder, string memory location)  public {
        
        if((active_holder[msg.sender] != true) || (active_holder[next_holder] != true)){
            revert("not registerd");
        }
        current_state[item].itemId = item;
        current_state[item].next_holder= next_holder;
        current_state[item].holder = msg.sender;
        current_state[item].shipT = now;
        current_state[item].location = location;
        history[item].push(current_state[item]);
        emit item_shipped(next_holder, current_state[item].shipT, item, location , transition_state.out_for_delivery);
        
    }
    
    function Received(string memory item) public onlyVendor  payable{
        if(active_holder[msg.sender] != true){
            revert();
        }
        
        emit item_received(now, item, transition_state.item_received );
    }
    
    function add_holder(address holder) onlyOwner public{
        active_holder[holder] = true;
        listed_Holder.push(holder);
    }
    
    function get_item_history( string memory item) public view returns(
        address [] memory  , uint [] memory  , string [] memory){
            
            
            state [] memory s = history[item];

            address [] memory holder = new address[](s.length);
            uint [] memory shipment_time = new uint[](s.length);
            string [] memory location = new string[](s.length);
            for(uint i = 0; i< s.length; i++){
                
                state memory t = s[i];
                holder[i] = t.holder;
                shipment_time[i]= t.shipT;
                location[i] = t.location;
            }
            
            return (holder, shipment_time, location);
            
        
    }
    
}
