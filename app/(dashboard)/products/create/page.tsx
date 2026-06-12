import Link from 'next/link';

export default function Page() {
  return (
    <>

				
				<section className="content-header">					
					<div className="container-fluid my-2">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1>Create Product</h1>
							</div>
							<div className="col-sm-6 text-right">
								<a href="products.html" className="btn btn-primary">Back</a>
							</div>
						</div>
					</div>
					
				</section>
				
				<section className="content">
					
					<div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card mb-3">
                                    <div className="card-body">								
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label htmlFor="title">Title</label>
                                                    <input type="text" name="title" id="title" className="form-control" placeholder="Title" />	
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label htmlFor="description">Description</label>
                                                    <textarea name="description" id="description" cols={30} rows={10} className="summernote" placeholder="Description"></textarea>
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>	                                                                      
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h2 className="h4 mb-3">Media</h2>								
                                        <div id="image" className="dropzone dz-clickable">
                                            <div className="dz-message needsclick">    
                                                <br />Drop files here or click to upload.<br /><br />                                            
                                            </div>
                                        </div>
                                    </div>	                                                                      
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h2 className="h4 mb-3">Pricing</h2>								
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label htmlFor="price">Price</label>
                                                    <input type="text" name="price" id="price" className="form-control" placeholder="Price" />	
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label htmlFor="compare_price">Compare at Price</label>
                                                    <input type="text" name="compare_price" id="compare_price" className="form-control" placeholder="Compare Price" />
                                                    <p className="text-muted mt-3">
                                                        To show a reduced price, move the product’s original price into Compare at price. Enter a lower value into Price.
                                                    </p>	
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>	                                                                      
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h2 className="h4 mb-3">Inventory</h2>								
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="sku">SKU (Stock Keeping Unit)</label>
                                                    <input type="text" name="sku" id="sku" className="form-control" placeholder="sku" />	
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="barcode">Barcode</label>
                                                    <input type="text" name="barcode" id="barcode" className="form-control" placeholder="Barcode" />	
                                                </div>
                                            </div>   
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <div className="custom-control custom-checkbox">
                                                        <input className="custom-control-input" type="checkbox" id="track_qty" name="track_qty" defaultChecked />
                                                        <label htmlFor="track_qty" className="custom-control-label">Track Quantity</label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <input type="number" min="0" name="qty" id="qty" className="form-control" placeholder="Qty" />	
                                                </div>
                                            </div>                                         
                                        </div>
                                    </div>	                                                                      
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-3">
                                    <div className="card-body">	
                                        <h2 className="h4 mb-3">Product status</h2>
                                        <div className="mb-3">
                                            <select name="status" id="status" className="form-control">
                                                <option value="1">Active</option>
                                                <option value="0">Block</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> 
                                <div className="card">
                                    <div className="card-body">	
                                        <h2 className="h4  mb-3">Product category</h2>
                                        <div className="mb-3">
                                            <label htmlFor="category">Category</label>
                                            <select name="category" id="category" className="form-control">
                                                <option value="">Electronics</option>
                                                <option value="">Clothes</option>
                                                <option value="">Furniture</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="category">Sub category</label>
                                            <select name="sub_category" id="sub_category" className="form-control">
                                                <option value="">Mobile</option>
                                                <option value="">Home Theater</option>
                                                <option value="">Headphones</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> 
                                <div className="card mb-3">
                                    <div className="card-body">	
                                        <h2 className="h4 mb-3">Product brand</h2>
                                        <div className="mb-3">
                                            <select name="status" id="status" className="form-control">
                                                <option value="">Apple</option>
                                                <option value="">Vivo</option>
                                                <option value="">HP</option>
                                                <option value="">Samsung</option>
                                                <option value="">DELL</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> 
                                <div className="card mb-3">
                                    <div className="card-body">	
                                        <h2 className="h4 mb-3">Featured product</h2>
                                        <div className="mb-3">
                                            <select name="status" id="status" className="form-control">
                                                <option value="0">No</option>
                                                <option value="1">Yes</option>                                                
                                            </select>
                                        </div>
                                    </div>
                                </div>                                 
                            </div>
                        </div>
						
						<div className="pb-5 pt-3">
							<button className="btn btn-primary">Create</button>
							<a href="products.html" className="btn btn-outline-dark ml-3">Cancel</a>
						</div>
					</div>
					
				</section>
				
			
    </>
  );
}
