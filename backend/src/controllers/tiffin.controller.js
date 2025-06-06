import Tiffin from "../models/tiffin.model.js";

// Create a new tiffin service (owner only)
export const createTiffin = async (req, res) => {
  try {
    const ownerId = req.user._id;

    console.log("Incoming request body:", req.body);

    const {
      name,
      description,
      startDate,
      weeklyMenu,
      status,
      providesMonthlyMess,
    } = req.body;

    // Map weeklyMenu keys (capitalize) to weeklyPlan keys (lowercase)
    const weeklyPlan = weeklyMenu
      ? {
          monday: weeklyMenu.Monday || "",
          tuesday: weeklyMenu.Tuesday || "",
          wednesday: weeklyMenu.Wednesday || "",
          thursday: weeklyMenu.Thursday || "",
          friday: weeklyMenu.Friday || "",
          saturday: weeklyMenu.Saturday || "",
          sunday: weeklyMenu.Sunday || "",
        }
      : {};

    const newTiffin = new Tiffin({
      name,
      description,
      status,
      weeklyPlan,
      messStartDate: startDate,
      providesMonthlyMess: providesMonthlyMess || false,
      owner: ownerId,
    });

    const savedTiffin = await newTiffin.save();
    res.status(201).json({ data: savedTiffin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create tiffin", error: error.message });
  }
};

export const getAllTiffins = async (req, res) => {
  try {
    const tiffins = await Tiffin.find()
      .select(
        "name weeklyPlan messStartDate owner userStatus providesMonthlyMess messApproved description status"
      )
      .populate("owner", "name email")
      .populate("userStatus.user", "name email")
      .lean();

    res.status(200).json({ data: tiffins });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tiffins", error: error.message });
  }
};

export const getTiffinById = async (req, res) => {
  try {
    const tiffin = await Tiffin.findById(req.params.id)
      .populate("owner", "name email")
      .populate("userStatus.user", "name email")
      .lean();

    if (!tiffin) {
      return res.status(404).json({ message: "Tiffin not found" });
    }
    res.status(200).json({ data: tiffin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tiffin", error: error.message });
  }
};

export const updateTiffin = async (req, res) => {
  try {
    const tiffin = await Tiffin.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!tiffin) {
      return res
        .status(404)
        .json({ message: "Tiffin not found or unauthorized" });
    }
    Object.assign(tiffin, req.body);
    const updatedTiffin = await tiffin.save();
    res.status(200).json({ data: updatedTiffin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update tiffin", error: error.message });
  }
};

export const deleteTiffin = async (req, res) => {
  try {
    const tiffin = await Tiffin.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!tiffin) {
      return res
        .status(404)
        .json({ message: "Tiffin not found or unauthorized" });
    }
    res.status(200).json({ message: "Tiffin deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete tiffin", error: error.message });
  }
};

export const approveMess = async (req, res) => {
  try {
    const tiffin = await Tiffin.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!tiffin) {
      return res
        .status(404)
        .json({ message: "Tiffin not found or unauthorized" });
    }
    tiffin.messApproved = true;
    await tiffin.save();
    res.status(200).json({ message: "Mess approved", data: tiffin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to approve mess", error: error.message });
  }
};

export const markDaily = async (req, res) => {
  try {
    const tiffin = await Tiffin.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!tiffin) {
      return res
        .status(404)
        .json({ message: "Tiffin not found or unauthorized" });
    }
    tiffin.dailyAttendance = req.body.dailyAttendance || tiffin.dailyAttendance;
    await tiffin.save();
    res.status(200).json({ message: "Daily record updated", data: tiffin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update daily record", error: error.message });
  }
};

export const requestMess = async (req, res) => {
  try {
    const tiffin = await Tiffin.findById(req.params.id);
    if (!tiffin) {
      return res.status(404).json({ message: "Tiffin not found" });
    }

    if (!tiffin.requests) {
      tiffin.requests = [];
    }

    if (!tiffin.requests.includes(req.user._id)) {
      tiffin.requests.push(req.user._id);
      await tiffin.save();
    }

    res.status(200).json({ message: "Mess request submitted", data: tiffin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to request mess", error: error.message });
  }
};

export const getMyTiffins = async (req, res) => {
  try {
    const tiffins = await Tiffin.find({ owner: req.user._id })
      .select(
        "name weeklyPlan messStartDate owner userStatus providesMonthlyMess messApproved description status"
      )
      .populate("owner", "name email")
      .populate("userStatus.user", "name email")
      .lean();

    res.status(200).json({ data: tiffins });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch your tiffins", error: error.message });
  }
};
