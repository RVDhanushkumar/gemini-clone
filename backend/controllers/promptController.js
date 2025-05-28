import User from "../models/User.js";

export const savePrompt = async (req, res) => {
  const { email, prompt, response } = req.body;
  try {
    const user = await User.findOne({email:email});
    if (!user) return res.status(404).json({ error: "User not found" });

    user.prompts.push({ prompt, response });
    await user.save();
    res.status(200).json({ message: "Prompt saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserPrompts = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({email:email});
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ prompts: user.prompts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
