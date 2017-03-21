<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Vegetable;

class VegetableController extends Controller
{
    private $status = 200;

    public function createVegetable(Request $request) {

        $validator = Validator::make($request->all(),
            [
                "name" => "required",
                "price" => "required|numeric",
                "contact_name" => "required",
                "contact_number" => "required"
            ]
        );

        if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_errors" => $validator->errors()]);
        }

        $vegetable_id = $request->id;
        $vegetableArray = array(
            "name" => $request->name,
            "price" => $request->price,
            "contact_name" => $request->contact_name,
            "contact_number" => $request->contact_number
        );
        if($vegetable_id !="") {           
            $vegetable = Vegetable::find($vegetable_id);
            if(!is_null($vegetable)){
                $updated_status = Vegetable::where("id", $vegetable_id)->update($vegetableArray);
                if($updated_status == 1) {
                    return response()->json(["status" => $this->status, "success" => true, "message" => "vegetable detail updated successfully"]);
                }
                else {
                    return response()->json(["status" => "failed", "message" => "Whoops! failed to update, try again."]);
                }               
            }                   
        }

        else {
            $vegetable = Vegetable::create($vegetableArray);
            if(!is_null($vegetable)) {            
                return response()->json(["status" => $this->status, "success" => true, "message" => "vegetable record created successfully", "data" => $vegetable]);
            }    
            else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! failed to create."]);
            }
        }        
    }

    public function vegetablesListing() {
        $vegetables = Vegetable::all();
        if(count($vegetables) > 0) {
            return response()->json(["status" => $this->status, "success" => true, "count" => count($vegetables), "data" => $vegetables]);
        }
        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "No record found"]);
        }
    }

    public function vegetableDetail($id) {
        $vegetable = Vegetable::find($id);
        if(!is_null($vegetable)) {
            return response()->json(["status" => $this->status, "success" => true, "data" => $vegetable]);
        }
        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "No vegetable found"]);
        }
    }

    public function vegetableDelete($id) {
        $vegetable = Vegetable::find($id);
        if(!is_null($vegetable)) {
            $delete_status = Vegetable::where("id", $id)->delete();
            if($delete_status == 1) {
                return response()->json(["status" => $this->status, "success" => true, "message" => "vegetable record deleted successfully"]);
            }
            else{
                return response()->json(["status" => "failed", "message" => "failed to delete, please try again"]);
            }
        }
        else {
            return response()->json(["status" => "failed", "message" => "Whoops! no vegetable found with this id"]);
        }
    }
}
