<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Storage;
use Illuminate\Support\Facades\Log;
use App\Models\Order;
//import Excel
use App\Imports\ProductsImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Product::with('brand')->withTrashed()->get();
        $brand = Brand::all();
        return response()->json($data);
        // $data = Product::with('brand')->withTrashed()->get();
        // $brands = Brand::all();

        // return response()->json([
        //     'products' => $data,
        //     'brands' => $brands
        // ]);
    }
    
    public function fetchProducts(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = 10; // Number of items per page
    
        // Fetch products with pagination
        $products = Product::paginate($perPage, ['*'], 'page', $page);
    
        return response()->json($products);
    }
    
    public function search(Request $request)
    {
        $query = $request->input('query');
    
        // Check if query is empty
        if (empty($query)) {
            return response()->json(['hits' => [], 'total' => 0]);
        }
    
        // Search products using Algolia
        $results = Product::search($query, function ($algolia, $query, $options) {
            $options['hitsPerPage'] = 20; // You can adjust this value if needed
            return $algolia->search($query, $options);
        });
    
        // Format the results
        $formattedResults = [
            'hits' => $results->hits(),
            'total' => $results->total(),
            'page' => $results->page(),
            'nbPages' => $results->nbPages()
        ];
    
        return response()->json($formattedResults);
    }
    
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
        public function store(Request $request)
        {
            $Product = new Product;
            $Product->product_name = $request->product_name;
            $Product->description = $request->description;
            $Product->price = $request->price;
            $Product->stocks = $request->stocks;
            $Product->category = $request->category;
            $Product->brand_id = $request->brand_id;
            $Product->img_path = '';


            if ($request->hasFile('uploads')) {
                foreach ($request->file('uploads') as $file) {
                    $fileName = Str::random(20) . '.' . $file->getClientOriginalExtension();
                    $file->storeAs('public/images', $fileName);
                    $Product->img_path .= 'storage/images/' . $fileName . ','; // Append image path
                }
                $Product->img_path = rtrim($Product->img_path, ','); // Remove trailing comma
            }

            $Product->save();

            return response()->json(["success" => "Brand created successfully.", "brand" => $Product, "status" => 200]);
        }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $Product = Product::where('id', $id)->first();
        return response()->json($Product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $Product = Product::find($id);

    if (!$Product) {
        return response()->json(["error" => "Product not found.", "status" => 404], 404);
    }

    $Product->product_name = $request->product_name;
    $Product->description = $request->description;
    $Product->price = $request->price;
    $Product->stocks = $request->stocks;
    $Product->category = $request->category;
    $Product->brand_id = $request->brand_id;

    if ($request->hasFile('uploads')) {
        $imagePaths = [];

        foreach ($request->file('uploads') as $file) {
            $fileName = Str::random(20) . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/images', $fileName);
            $imagePaths[] = 'storage/images/' . $fileName;
        }

        $Product->img_path = implode(',', $imagePaths);
    }

    $Product->save();

    return response()->json(["success" => "Product updated successfully.", "status" => 200]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if ($product) {
            $product->delete();
            $data = array('message' => 'Product deleted successfully', 'code' => 200);
            return response()->json($data);
        }

        $data = array('error' => 'Product not deleted', 'code' => 400);
        return response()->json($data);
    }

    /**
     * Restore the specified resource.
     */
    public function restore(string $id)
    {
        $product = Product::withTrashed()->find($id);

        if ($product) {
            $product->restore();
            $data = array('message' => 'Product restored successfully', 'code' => 200);
            return response()->json($data);
        }

        $data = array('error' => 'Product not restored', 'code' => 400);
        return response()->json($data);
    }

    public function import(Request $request)
    {
        $request ->validate([
            'importFile' => ['required', 'file', 'mimes:xlsx,xls']
        ]);

        Excel::import(new ProductsImport, $request->file('importFile'));

        return response()->json(['success' => 'Brands imported successfully'], 200);
    }

    public function PdataChart()
    {

         $products = Product::withSum('orders as total_sold', 'order_product.quantity')->get();

         return response()->json($products);
        
    }

}
