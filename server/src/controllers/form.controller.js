import { postFormService } from "../services/form.services.js";

export const postForm = async (req, res) => {
  try {
    const data = req.body;
    const response=postFormService(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
