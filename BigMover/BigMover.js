const url = "https://gdsapi.cnbc.com/market-mover/groupMover/SP500/CHANGE_PCT/BOTH/12.json?source=SAVED&delayed=false&partnerId=2"

export const handler = async(event) => {
  try{
    const res = await fetch(url);
    console.info("status", res.status);
    const json= await res.json();
    return json;
  }
  catch (e) {
    console.error(e);
    return 500;
  }
};