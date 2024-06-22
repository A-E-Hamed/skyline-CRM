const Shows = require("../models/shows");

const createShow = async (req, res) => {
  const { Show, Company, Phone, Timezone, ...rest } = req.body;

  // Validate required fields
  if (!Show || !Company || !Phone || !Timezone) {
    return res
      .status(400)
      .json({ message: "Show, Company, Phone, and Timezone are required." });
  }

  try {
    const newShow = {
      Show,
      Companies: [
        {
          Company,
          Phone,
          Timezone,
        },
      ],
      ...rest,
    };

    const createdShow = await Shows.create(newShow);
    res.status(201).json(createdShow);
  } catch (error) {
    console.error("Error creating show:", error);
    res.status(500).json({ message: error.message });
  }
};

const filterShowsByTimezone = async (req, res) => {
  const { Timezone, numCompanies = 25, numShows = 10 } = req.body;

  if (!Timezone) {
    return res.status(400).json({ message: "Timezone is required" });
  }

  try {
    // Fetch all shows from the database
    const shows = await Shows.find();

    // Filter companies within each show by the specified timezone
    const filteredShows = shows
      .map((show) => {
        const filteredCompanies = show.Companies.filter(
          (company) => company.Timezone === Timezone
        );

        // Return the show with filtered companies if there are any matching companies
        if (filteredCompanies.length > 0) {
          return {
            ...show.toObject(),
            Companies: filteredCompanies,
          };
        }

        return null;
      })
      .filter((show) => show !== null); // Remove any shows with no matching companies

    // Flatten the array of companies
    const allFilteredCompanies = filteredShows.reduce((acc, show) => {
      return acc.concat(show.Companies);
    }, []);

    // Shuffle the array of companies
    const shuffledCompanies = allFilteredCompanies.sort(
      () => 0.5 - Math.random()
    );

    // Select the specified number of companies
    const selectedCompanies = shuffledCompanies.slice(0, numCompanies);

    // Shuffle the array of shows
    const shuffledShows = filteredShows.sort(() => 0.5 - Math.random());

    // Select the specified number of shows
    const selectedShows = shuffledShows.slice(0, numShows);

    // Group the selected companies back into shows
    const resultShows = [];
    let remainingCompanies = selectedCompanies.slice();

    selectedShows.forEach((show) => {
      const numToTake = Math.ceil(
        remainingCompanies.length / (selectedShows.length - resultShows.length)
      );
      const companiesForShow = remainingCompanies.slice(0, numToTake);
      remainingCompanies = remainingCompanies.slice(numToTake);

      if (companiesForShow.length > 0) {
        resultShows.push({
          ...show,
          Companies: companiesForShow,
        });
      }
    });

    res.json(resultShows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createShow, filterShowsByTimezone };
