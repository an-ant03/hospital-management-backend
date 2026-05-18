import { registerUser, loginUser, logoutUser } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const {user, token} = await registerUser(req.body);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                role: user.role,
                email: email,
            },
            token,
        },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const logout = async(req, res) => {
    try{
        logoutUser();
        res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
    
}

