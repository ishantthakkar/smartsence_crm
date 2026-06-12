import Link from 'next/link';

export default function Page() {
  return (
    <>

				
				<section className="content-header">					
					<div className="container-fluid my-2">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1>Create Brand</h1>
							</div>
							<div className="col-sm-6 text-right">
								<a href="brands.html" className="btn btn-primary">Back</a>
							</div>
						</div>
					</div>
					
				</section>
				
				<section className="content">
					
					<div className="container-fluid">
						<div className="card">
							<div className="card-body">								
								<div className="row">
									<div className="col-md-6">
										<div className="mb-3">
											<label htmlFor="name">Name</label>
											<input type="text" name="name" id="name" className="form-control" placeholder="Name" />	
										</div>
									</div>
									<div className="col-md-6">
										<div className="mb-3">
											<label htmlFor="email">Slug</label>
											<input type="text" name="slug" id="slug" className="form-control" placeholder="Slug" />	
										</div>
									</div>									
								</div>
							</div>							
						</div>
						<div className="pb-5 pt-3">
							<button className="btn btn-primary">Create</button>
							<a href="brands.html" className="btn btn-outline-dark ml-3">Cancel</a>
						</div>
					</div>
					
				</section>
				
			
    </>
  );
}
