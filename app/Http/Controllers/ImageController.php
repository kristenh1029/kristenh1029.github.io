<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Image;
use App\Models\User;


class ImageController extends Controller
{
    public function storePFP(Request $request){
      //  $validated = $request->validated();

        $image = $request->file('image');
        $imageName = $image->getClientOriginalName();
      
       // dd($request->user()->id);
        $path = "/public/images/" .$imageName;
        

      //  insertImageIntoDB($validated['description'], $imageName);
     //Storage::put($path, file_get_contents(($image)));
     Storage::disk(name: 'local')->put($path, file_get_contents($image));
     $user =User::find($request->user()->id);
     $user->update([
      'pfpPath' => $path
      

 ]);
return response()->json('upload success');



    }
}
