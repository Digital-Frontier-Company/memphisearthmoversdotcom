
import { Link } from "react-router-dom";
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

const GravelDeliveryBreadcrumbs = () => {
  return (
    <div className="bg-gray-100 py-3">
      <div className="mem-container">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dump-truck-services">Services</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            
            <BreadcrumbItem>
              <BreadcrumbPage>Memphis Gravel Delivery</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default GravelDeliveryBreadcrumbs;
