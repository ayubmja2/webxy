<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MealPlanController extends Controller
{
    public function  index() {
        return auth()->user()->mealPlans()->get();
    }

    public function store(Request $request) {

        $request->validate([
            'day' => 'required|string',
            'meals' => 'required|array'
        ]);

        $mealPlan = auth()->user()->mealPlans()->updateOrCreate(
            ['day' => $request->day],
            ['meals' => json_encode($request->meals)]
        );

        return response()->json($mealPlan);
    }

    public function destroy(Request $request) {
        $day = $request->input('day');
        $user = auth()->user();

        // Find the meal plan for the selected day
        $mealPlan = $user->mealPlans()->where('day', $day)->first();

        if($mealPlan) {
            $mealPlan->delete();
            return response()->json(['message' => 'Meal plan deleted']);
        }
        return response()->json(['message' => 'Meal plan not found'], 404);
    }
}
