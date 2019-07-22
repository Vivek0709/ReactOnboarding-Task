using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvpReact.Models;

namespace MvpReact.Controllers
{
    public class CustomerController : Controller
    {
        private MVPReactDB _db=new MVPReactDB();
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        // GET Customers
        public JsonResult GetCustomers()
        {
            try
            {
                var customerList = _db.Customers.ToList();
                return new JsonResult { Data = customerList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        // CREATE Customer
        public JsonResult CreateCustomer(Customer customer)
        {
            try
            {
                _db.Customers.Add(customer);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Customer Create Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        //Update Customer
        public JsonResult GetUpdateCustomer(int id)
        {
            try
            {
                Customer customer = _db.Customers.Where(c => c.Id == id).SingleOrDefault();
                return new JsonResult { Data = customer, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Customer Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult UpdateCustomer(Customer customer)
        {
            try
            {
                Customer cust = _db.Customers.Where(c => c.Id == customer.Id).SingleOrDefault();
                cust.Name = customer.Name;
                cust.Address = customer.Address;
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Customer Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // DELETE Customer
        public JsonResult DeleteCustomer(int id)
        {
            try
            {
                var customer = _db.Customers.Where(c => c.Id == id).SingleOrDefault();
                if (customer != null)
                {
                    _db.Customers.Remove(customer);
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