using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvpReact.Models;

namespace MvpReact.Controllers
{
    public class StoreController : Controller
    {
        private MVPReactDB _db = new MVPReactDB();
        // GET: Store
        public ActionResult Index()
        {
            return View();
        }

        // GET Stores
        public JsonResult GetStores()
        {
            try
            {
                var storeList = _db.Stores.ToList();
                return new JsonResult { Data = storeList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        // CREATE Store
        public JsonResult CreateStore(Store store)
        {
            try
            {
                _db.Stores.Add(store);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Store Create Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // UPDATE Store
        public JsonResult GetUpdateStore(int id)
        {
            try
            {
                Store store = _db.Stores.Where(s => s.Id == id).SingleOrDefault();
                return new JsonResult { Data = store, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Store Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult UpdateStore(Store store)
        {
            try
            {
                Store st = _db.Stores.Where(s => s.Id == store.Id).SingleOrDefault();
                st.Name = store.Name;
                st.Address = store.Address;
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Store Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // DELETE Store
        public JsonResult DeleteStore(int id)
        {
            try
            {
                var store = _db.Stores.Where(s => s.Id == id).SingleOrDefault();
                if (store != null)
                {
                    _db.Stores.Remove(store);
                    _db.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Deletion Falied", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}