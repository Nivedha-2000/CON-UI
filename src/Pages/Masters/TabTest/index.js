import React from 'react'
import '../../../Assets/style.css'
import bootstrap from 'bootstrap/dist/js/bootstrap'
// import '../../../Assets/bootstrapstyle.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
//assets/img/delete-tbl.svg
import deletetbl from '../../../Assets/images/style/delete-tbl.svg'
import breadcrumbIcon from '../../../Assets/images/style/bred-icon.svg'
import '../../../Assets/sumoselect.css'
import jquery from '../../../Assets/js/jquerymin'
// import jquerySumoselect from '../../../Assets/js/jquerysumoselect' 
// import customjs from '../../../Assets/js/custom'
export default function TabTest() {
  
  return (
      <>
            {/* <!-- container -->  */}
            <div class="container-fluid">
                {/* <!-- breadcrumb --> */}
                <div class="breadcrumb-header justify-content-between bread-list">
                    <div class="w-100">
                        <div class="d-flex border-bottom pb-15">
                            <div class="me-auto ">
                                <a href="#myCollapse" data-bs-toggle="collapse" aria-expanded="true" class="text-black">
                                    <h4 class="content-title float-start pr-20 border-0"><span class="pr-10"><img
                                                src={breadcrumbIcon} alt=""/></span> Item Creations</h4>
                                </a>
                                <div id="myCollapse" class="collapse w-100 float-start pl-35 ">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="#">Breadcrumb One</a></li>
                                            <li class="breadcrumb-item"><a href="#">Breadcrumb Two</a></li>
                                            <li class="breadcrumb-item active text-primary" aria-current="page">Item
                                                Creations</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>

                            <div class="pt-15">

                            </div>
                        </div>



                        <div class="col-lg">

                        </div>


                    </div>
                </div>
                {/* <!-- breadcrumb -->
                <!-- row opened--> */}
                <div class="clear"></div>


                <div class="row mt-15 dis-sel mt-20">
                    <div class="col-lg-2">
                        <label>Parent Group</label>
                        <div class="main-select">
                            <select name="somename" class="form-control SlectBox main-select"
                                onclick="console.log($(this).val())" onchange="console.log('change is firing')">
                                
                                <option title="Volvo is a car" value="volvo">Select Parent Group</option>
                                <option value="saab">option</option>
                                <option value="mercedes">option</option>
                                <option value="audi">option</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <label>Material Type </label>
                        <div class="main-select">
                            <select name="somename" class="form-control SlectBox main-select"
                                onclick="console.log($(this).val())" onchange="console.log('change is firing')">
                                
                                <option title="Volvo is a car" value="volvo">Thread </option>
                                <option value="saab">option</option>
                                <option value="mercedes">option</option>
                                <option value="audi">option</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <label>Material Group </label>
                        <div class="main-select">
                            <select name="somename" class="form-control SlectBox main-select"
                                onclick="console.log($(this).val())" onchange="console.log('change is firing')">
                                
                                <option title="Volvo is a car" value="volvo">Premiere Section </option>
                                <option value="saab">option</option>
                                <option value="mercedes">option</option>
                                <option value="audi">option</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <label>Material Sub </label>
                        <div class="main-select">
                            <select name="somename" class="form-control SlectBox main-select"
                                onclick="console.log($(this).val())" onchange="console.log('change is firing')">
                                
                                <option title="Volvo is a car" value="volvo">Soft Thread </option>
                                <option value="saab">option</option>
                                <option value="mercedes">option</option>
                                <option value="audi">option</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <label>Item Creation Action</label>
                        <div class="tog-swi float-start w-100 pos-relative">
                            <input type="checkbox" id="switch" /><label for="switch">Toggle</label>
                            <span>Not Active</span>
                        </div>
                    </div>


                </div>
                <div class="row mt-15 dis-sel">
                    <div class="col-lg-2">
                        <label>Material Code</label>
                        <div class="main-select">
                            <select name="somename" class="form-control SlectBox main-select"
                                onclick="console.log($(this).val())" onchange="console.log('change is firing')">
                                
                                <option title="Volvo is a car" value="volvo">Type Material Code</option>
                                <option value="saab">option</option>
                                <option value="mercedes">option</option>
                                <option value="audi">option</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <label>Buyer Divison</label>
                        <div class="main-select">
                            <select name="somename" class="form-control SlectBox main-select"
                                onclick="console.log($(this).val())" onchange="console.log('change is firing')">
                                
                                <option title="Volvo is a car" value="volvo">Type Material Code</option>
                                <option value="saab">option</option>
                                <option value="mercedes">option</option>
                                <option value="audi">option</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <label>Buyer Descripion</label>
                        <input type="text" class="form-control" placeholder="Type buyer description"/>
                    </div>
                    <div class="col-lg-2 pos-relative img-pops">
                        <label>Image Attachment</label>
                        <a href="" class="po-img">
                            <input type="text" class="form-control im-prev" value="Planning.jpg"/>
                            <div class="pp-img">
                                <img src="assets/img/jean-pop.png"/>
                            </div>
                        </a>

                    </div>
                    <div class="d-flex align-content-center pt-40 justify-content-center">


                        <div class=" ">
                            <button class="btn btn-primary search-btn btn-block  ">Clear All</button>
                        </div>
                        <div class="">
                            <button class="btn btn-success search-btn btn-block ml-10">Show Result</button>
                        </div>
                    </div>
                </div>

                <div class="row mt-25 main-tab pl-15 pr-15">
                    <ul class="nav nav-tabs p-15 pl-15" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                type="button" role="tab" aria-controls="home" aria-selected="true">Thread</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile1"
                                type="button" role="tab" aria-controls="profile" aria-selected="false">Fabric</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                                type="button" role="tab" aria-controls="profile" aria-selected="false">Details</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact"
                                type="button" role="tab" aria-controls="contact" aria-selected="false">Purchase
                                Info</button>
                        </li>
                    </ul>
                    <div class="tab-content p-15 mb-80" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                            <div class="row mt-15">
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Quality</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Enter TEX</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Enter TEX</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <input type="text" class="form-control" placeholder="No. Of Meter"/>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="home-tab">

                            <div class="row mt-15">
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fiber</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Content</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fabric Content</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fabric Type</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fabric Wave</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-10">
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fiber</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Content</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fabric Content</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fabric Type</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fabric Wave</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-10">
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fiber</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                           
                                            <option title="Volvo is a car" value="volvo">Content</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fabric Content</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fabric Type</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                          
                                            <option title="Volvo is a car" value="volvo">Fabric Wave</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-10">
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fiber</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Content</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                           
                                            <option title="Volvo is a car" value="volvo">Fabric Content</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                           
                                            <option title="Volvo is a car" value="volvo">Fabric Type</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                           
                                            <option title="Volvo is a car" value="volvo">Fabric Wave</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-10">
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                         
                                            <option title="Volvo is a car" value="volvo">Fiber</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Content</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                          
                                            <option title="Volvo is a car" value="volvo">Fabric Content</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                            
                                            <option title="Volvo is a car" value="volvo">Fabric Type</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                         
                                            <option title="Volvo is a car" value="volvo">Fabric Wave</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div class="row mt-10">
                                <div class="col-lg-2">
                                    <label class="bold">Group Article Number</label>

                                </div>
                                <div class="col-lg-2">
                                    <label class="bold">Product</label>

                                </div>
                                <div class="col-lg-3">
                                    <label class="bold">Finish</label>

                                </div>
                                <div class="col-lg">
                                    <label class="bold">Remarks</label>

                                </div>
                                <div class="col-lg">
                                </div>
                            </div>
                            <div class="row mt-10">
                                <div class="col-lg-2">
                                    <p class="g-dark">67UE892</p>
                                </div>
                                <div class="col-lg-2">
                                    <p class="g-dark">Care Label</p>
                                </div>
                                <div class="col-lg-3">
                                    <p class="g-dark">Not Required</p>
                                </div>
                                <div class="col-lg">
                                    <p class="g-dark">The product is updated and cleared.</p>
                                </div>
                                <div class="col-lg-auto">
                                    <button class="btn btn-light">
                                        <img src={deletetbl}/>
                                    </button>
                                </div>
                            </div>
                            <div class="row mt-10">
                                <div class="col-lg-2">
                                    <p class="g-dark">67UE892</p>
                                </div>
                                <div class="col-lg-2">
                                    <p class="g-dark">Care Label</p>
                                </div>
                                <div class="col-lg-3">
                                    <p class="g-dark">Not Required</p>
                                </div>
                                <div class="col-lg">
                                    <p class="g-dark">The product is updated and cleared.</p>
                                </div>
                                <div class="col-lg-auto">
                                    <button class="btn btn-light">
                                      <img src={deletetbl} />
                                    </button>
                                </div>
                            </div>
                            <div class="row mt-10">
                                <div class="col-lg-2">
                                    <p class="g-dark">67UE892</p>
                                </div>
                                <div class="col-lg-2">
                                    <p class="g-dark">Care Label</p>
                                </div>
                                <div class="col-lg-3">
                                    <p class="g-dark">Not Required</p>
                                </div>
                                <div class="col-lg">
                                    <p class="g-dark">The product is updated and cleared.</p>
                                </div>
                                <div class="col-lg-auto">
                                    <button class="btn btn-light">
                                      <img src={deletetbl} />
                                    </button>
                                </div>
                            </div>
                            <div class="row mt-10">
                                <div class="col-lg-2">

                                    <input type="text" class="form-control" placeholder="Group Article Number"/>
                                </div>
                                <div class="col-lg-2">

                                    <input type="text" class="form-control" placeholder="Enter Product Type "/>
                                </div>
                                <div class="col-lg-3">

                                    <input type="text" class="form-control" placeholder="Type Finish"/>
                                </div>
                                <div class="col-lg">

                                    <input type="text" class="form-control" placeholder="Enter your remarks here"/>
                                </div>
                                <div class="col-lg-auto"> <button class="icons-list-item org-plus m-0">
                                        <i class="fe fe-plus fs-5 pe-auto"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <div class="row mt-10">
                                <div class="col-lg-2">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                          
                                            <option title="Volvo is a car" value="volvo">Material Code</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">

                                    <div class="main-select">
                                        <select name="somename" class="form-control SlectBox main-select"
                                            onclick="console.log($(this).val())"
                                            onchange="console.log('change is firing')">
                                           
                                            <option title="Volvo is a car" value="volvo">Supplier</option>
                                            <option value="saab">option</option>
                                            <option value="mercedes">option</option>
                                            <option value="audi">option</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">

                                    <input type="text" class="form-control" placeholder="Buyer Reference No"/>
                                </div>
                                <div class="col-lg-2">

                                    <input type="text" class="form-control" placeholder="Supplier Reference"/>

                                </div>
                                <div class="col-lg-2">
                                    <input type="text" class="form-control" placeholder="Multiples"/>

                                </div>
                            </div>
                            <div class="row mt-10">
                                <div class="col-lg-5">

                                    <input type="text" class="form-control" placeholder="Descriptions"/>
                                </div>
                                <div class="col-lg">

                                    <input type="text" class="form-control" placeholder="Remarks"/>
                                </div>
                                <div class="col-lg-auto"> <button class="icons-list-item org-plus m-0">
                                        <i class="fe fe-plus fs-5 pe-auto"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="table-responsive pb-10 bg-white mt-20">
                                <table id="example-1" class="table table-striped tbl-wht   text-md-nowrap ">
                                    <thead>
                                        <tr>
                                            <th> Material Code</th>

                                            <th>Supplier</th>

                                            <th>Brand </th>
                                            <th>Supplier Reference </th>
                                            <th>Description </th>
                                            <th>Action </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>6739YU8</td>
                                            <td>San Marino</td>
                                            <td>Levis</td>
                                            <td>Ultrices Neque</td>
                                            <td>Lacus vestibulum sed arcu non odio euismod</td>
                                            <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg" class="w-auto"/></a></td>
                                        </tr>
                                        <tr>
                                            <td>6739YU8</td>
                                            <td>San Marino</td>
                                            <td>Levis</td>
                                            <td>Ultrices Neque</td>
                                            <td>Lacus vestibulum sed arcu non odio euismod</td>
                                            <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg"
                                                        class="w-auto"/></a></td>

                                        </tr>
                                        <tr>
                                            <td>6739YU8</td>
                                            <td>San Marino</td>
                                            <td>Levis</td>
                                            <td>Ultrices Neque</td>
                                            <td>Lacus vestibulum sed arcu non odio euismod</td>
                                            <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg"
                                                        class="w-auto"/></a></td>

                                        </tr>
                                        <tr>
                                            <td>6739YU8</td>
                                            <td>San Marino</td>
                                            <td>Levis</td>
                                            <td>Ultrices Neque</td>
                                            <td>Lacus vestibulum sed arcu non odio euismod</td>
                                            <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg" class="w-auto"/></a></td>

                                        </tr>
                                        <tr>
                                            <td>6739YU8</td>
                                            <td>San Marino</td>
                                            <td>Levis</td>
                                            <td>Ultrices Neque</td>
                                            <td>Lacus vestibulum sed arcu non odio euismod</td>
                                            <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg" class="w-auto"/></a></td>

                                        </tr>
                                        <tr>
                                            <td>6739YU8</td>
                                            <td>San Marino</td>
                                            <td>Levis</td>
                                            <td>Ultrices Neque</td>
                                            <td>Lacus vestibulum sed arcu non odio euismod</td>
                                            <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg" class="w-auto"/></a></td>

                                        </tr>
                                        <tr>
                                            <td>6739YU8</td>
                                            <td>San Marino</td>
                                            <td>Levis</td>
                                            <td>Ultrices Neque</td>
                                            <td>Lacus vestibulum sed arcu non odio euismod</td>
                                            <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg" class="w-auto"/></a></td>

                                        </tr>
                                        <tr>
                                            <td>6739YU8</td>
                                            <td>San Marino</td>
                                            <td>Levis</td>
                                            <td>Ultrices Neque</td>
                                            <td>Lacus vestibulum sed arcu non odio euismod</td>
                                            <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg" class="w-auto"/></a></td>

                                        </tr>
                                        <tr>
                                            <td>6739YU8</td>
                                            <td>San Marino</td>
                                            <td>Levis</td>
                                            <td>Ultrices Neque</td>
                                            <td>Lacus vestibulum sed arcu non odio euismod</td>
                                            <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg" class="w-auto"/></a></td>

                                        </tr>
                                        <tr>
                                            <td>6739YU8</td>
                                            <td>San Marino</td>
                                            <td>Levis</td>
                                            <td>Ultrices Neque</td>
                                            <td>Lacus vestibulum sed arcu non odio euismod</td>
                                            <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg" class="w-auto"/></a></td>

                                        </tr>
                                        <tr>
                                            <td>6739YU8</td>
                                            <td>San Marino</td>
                                            <td>Levis</td>
                                            <td>Ultrices Neque</td>
                                            <td>Lacus vestibulum sed arcu non odio euismod</td>
                                            <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg" class="w-auto"/></a></td>

                                        </tr>
                                        <tr>
                                            <td>6739YU8</td>
                                            <td>San Marino</td>
                                            <td>Levis</td>
                                            <td>Ultrices Neque</td>
                                            <td>Lacus vestibulum sed arcu non odio euismod</td>
                                            <td><a href="" class="text-primary"><img src="assets/img/delete-im.svg" class="w-auto"/></a></td>

                                        </tr>
                                    </tbody>


                                </table>

                            </div> 
                        </div>
                    </div>
                    <div class="d-flex align-content-center pt-20 pb-20 justify-content-center sticky-bottom">


                        <div class=" ">
                            <button class="btn btn-primary search-btn btn-block  ">Cancel</button>
                        </div>
                        <div class="">
                            <button class="btn btn-success search-btn btn-block ml-10">Save</button>
                        </div>
                    </div>
                </div>


                {/* <!--row closed--> */}
            </div>
            {/* <!-- Container closed --> */}
    
      </>
  )
}
