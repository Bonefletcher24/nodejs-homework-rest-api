const getAll = async (req, res, next) => {
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    
    const filter = { owner: req.user._id };
    if (favorite !== undefined) {
      filter.favorite = favorite === 'true';
    }
  
    const contacts = await Contact.find(filter)
      .skip(skip)
      .limit(Number(limit));
  
    res.json(contacts);
  };
  