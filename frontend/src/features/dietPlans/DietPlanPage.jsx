// src/features/dietPlans/DietPlanPage.jsx
import React from 'react';
import { Typography, Paper, Button, Grid, Box, Chip, Divider } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EditNoteIcon from '@mui/icons-material/EditNote'; // For requesting changes or logging food
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import TapasIcon from '@mui/icons-material/Tapas'; // Using Tapas for Snack
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import NotesIcon from '@mui/icons-material/Notes';

// Enhanced Mock Data
const mockDietPlan = {
    id: 'dp123',
    name: "Performance Fueling Plan",
    assignedDate: "2023-10-22",
    trainerName: "Coach Sarah",
    goal: "Muscle Gain & Energy",
    totalCalories: 2800, // Example
    macronutrients: { // Example
        proteinGrams: 180,
        carbGrams: 300,
        fatGrams: 90
    },
    trainerNotes: "Stick to this plan consistently for 4 weeks. Drink plenty of water. You can swap chicken for fish in lunch/dinner. Adjust carb portions based on workout intensity.",
    meals: {
        breakfast: { name: "Protein Oats Deluxe", calories: 500, items: ["Rolled Oats (80g)", "Whey Protein (1 scoop)", "Mixed Berries (1 cup)", "Chia Seeds (1 tbsp)", "Walnuts (15g)"] },
        snack1: { name: "Greek Yogurt & Almonds", calories: 250, items: ["Greek Yogurt (200g)", "Almonds (20g)", "Cinnamon"] },
        lunch: { name: "Lean Beef Stir-fry with Quinoa", calories: 700, items: ["Lean Beef Strips (180g)", "Mixed Vegetables (2 cups)", "Quinoa (1 cup cooked)", "Soy Sauce (low sodium)"] },
        snack2: { name: "Fruit & Cottage Cheese", calories: 250, items: ["Apple (1 medium)", "Cottage Cheese (150g)"] },
        dinner: { name: "Baked Salmon, Sweet Potato & Asparagus", calories: 700, items: ["Salmon Fillet (180g)", "Sweet Potato (1 large, baked)", "Asparagus (1 cup steamed)", "Lemon & Herbs"] }
    },
    hydrationGoalLiters: 3.5,
};

const MealCard = ({ title, meal, icon }) => {
    if (!meal) return null; // Handle cases where a meal might not be defined for a slot
    return (
        <Paper className="p-4 rounded-xl shadow-md h-full flex flex-col bg-white hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
                {React.cloneElement(icon, { className: "text-3xl text-fittrack-blue mr-3" })}
                <div>
                    <Typography variant="h6" className="font-semibold text-fittrack-gray-800 leading-tight">{title}</Typography>
                    <Typography variant="caption" className="text-fittrack-gray-500">Approx. {meal.calories} kcal</Typography>
                </div>
            </div>
            <Typography variant="subtitle1" className="font-medium text-fittrack-gray-700 mb-1">{meal.name}</Typography>
            <ul className="list-disc list-inside text-sm text-fittrack-gray-600 space-y-0.5 flex-grow pl-1">
                {meal.items.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
            {/* Optional: Button to log this meal */}
            {/* <Button size="small" variant="text" className="mt-3 self-start normal-case text-fittrack-blue">Log Meal</Button> */}
        </Paper>
    );
};


const DietPlanPage = () => {
  const plan = mockDietPlan; // Use mock data

  return (
    <div className="space-y-6"> {/* Main container for spacing */}
      <Paper className="p-4 sm:p-6 rounded-xl shadow-lg bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="mb-3 sm:mb-0">
            <Typography variant="h4" component="h1" className="font-bold text-fittrack-gray-900">
              My Diet Plan
            </Typography>
            {plan && <Typography variant="subtitle1" className="text-fittrack-blue font-medium">{plan.name}</Typography>}
          </div>
          {plan && (
            <Button variant="outlined" startIcon={<EditNoteIcon />} className="normal-case text-fittrack-blue border-fittrack-blue hover:bg-fittrack-blue/10 self-start sm:self-center" onClick={() => alert("Request Plan Changes / Log Food TBD")}>
              Log Food / Request Changes
            </Button>
          )}
        </div>

        {plan ? (
          <>
            <Paper variant="outlined" className="p-3 sm:p-4 rounded-lg bg-fittrack-blue/5 border-fittrack-blue/30 mb-6">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="caption" className="text-fittrack-gray-600 block">Goal</Typography>
                        <Typography className="font-medium text-fittrack-gray-800">{plan.goal}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="caption" className="text-fittrack-gray-600 block">Total Calories</Typography>
                        <Typography className="font-medium text-fittrack-gray-800">{plan.totalCalories} kcal</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="caption" className="text-fittrack-gray-600 block">Assigned By</Typography>
                        <Typography className="font-medium text-fittrack-gray-800">{plan.trainerName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="caption" className="text-fittrack-gray-600 block">Hydration Goal</Typography>
                        <Typography className="font-medium text-fittrack-gray-800">{plan.hydrationGoalLiters} Liters</Typography>
                    </Grid>
                </Grid>
                {plan.trainerNotes && (
                    <>
                        <Divider className="my-3" />
                        <div className="flex items-start">
                            <NotesIcon className="text-fittrack-gray-500 mr-2 mt-0.5 text-lg"/>
                            <Typography variant="body2" className="italic text-fittrack-gray-600">{plan.trainerNotes}</Typography>
                        </div>
                    </>
                )}
            </Paper>

            <Typography variant="h5" className="font-semibold text-fittrack-gray-800 mb-4 mt-6">Daily Meals</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}><MealCard title="Breakfast" meal={plan.meals.breakfast} icon={<BreakfastDiningIcon />} /></Grid>
              {plan.meals.snack1 && <Grid item xs={12} md={6} lg={4}><MealCard title="Mid-Morning Snack" meal={plan.meals.snack1} icon={<TapasIcon />} /></Grid>}
              <Grid item xs={12} md={6} lg={4}><MealCard title="Lunch" meal={plan.meals.lunch} icon={<LunchDiningIcon />} /></Grid>
              {plan.meals.snack2 && <Grid item xs={12} md={6} lg={4}><MealCard title="Afternoon Snack" meal={plan.meals.snack2} icon={<TapasIcon />} /></Grid>}
              <Grid item xs={12} md={6} lg={4}><MealCard title="Dinner" meal={plan.meals.dinner} icon={<DinnerDiningIcon />} /></Grid>
              {/* Add more meal slots if needed, e.g., Pre/Post Workout */}
            </Grid>
          </>
        ) : (
          <div className="mt-6 p-6 border-2 border-dashed border-fittrack-gray-300 rounded-lg text-center min-h-[300px] flex flex-col justify-center items-center">
            <RestaurantMenuIcon className="text-6xl text-fittrack-gray-300 mb-4" />
            <Typography className="text-fittrack-gray-500 text-xl mb-2">
              No active diet plan assigned.
            </Typography>
            <Typography className="text-fittrack-gray-400">
              Contact your trainer or gym staff to get a personalized nutrition plan.
            </Typography>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default DietPlanPage;