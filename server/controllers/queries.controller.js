import {postQueryService} from '../services/queires.services.js';
export const postQuery = async(req,res)=>{
  try{
    const data = req.body;
    const response = await postQueryService(data);
    res.status(200).json(response);
  }
  catch(error){
    res.status(500).json({error: error.message});
  }
}
