using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvpReact.Models;

namespace MvpReact.Controllers
{
    public class ProductsController : Controller
    {
        private MVPReactDB _db = new MVPReactDB();
        // GET: Products
        public ActionResult Index()
        {
            return View();
        }

        // GET Products
        public JsonResult GetProducts()
        {
            try
            {
                var productList = _db.Products.ToList();
                return new JsonResult { Data = productList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        // CREATE Product
        public JsonResult CreateProduct(Product product)
        {
            try
            {
                _db.Products.Add(product);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Product Create Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // UPDATE Product
        public JsonResult GetUpdateProduct(int id)
        {
            try
            {
                Product product = _db.Products.Where(p => p.Id == id).SingleOrDefault();
                return new JsonResult { Data = product, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Product Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult UpdateProduct(Product product)
        {
            try
            {
                Product prod = _db.Products.Where(p => p.Id == product.Id).SingleOrDefault();
                prod.Name = product.Name;
                prod.Price = product.Price;
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Product Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // DELETE Product
        public JsonResult DeleteProduct(int id)
        {
            try
            {
                var product = _db.Products.Where(p => p.Id == id).SingleOrDefault();
                if (product != null)
                {
                    _db.Products.Remove(product);
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