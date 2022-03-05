<?php
namespace Blueskytechco\CustomCatalog\Observer;

use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Event\Observer;
use Magento\Framework\Registry;

class LayoutLoadBefore implements ObserverInterface
{

    protected $_registry;
	protected $request;

    public function __construct(
		\Magento\Framework\App\Request\Http $request,
        Registry $registry
    ){
        $this->_registry = $registry;
		$this->request = $request;
    }

    public function execute(Observer $observer)
    {
        $action = $observer->getData('full_action_name');
		$params = $this->request->getParams();
        if(isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], 'categorytab/category/view') !== false || strpos($_SERVER['REQUEST_URI'], 'blueskytechco_quickview/product/view') !== false){
            return $this;
        }
        $layout = $observer->getData('layout');
		
		/* Category page */
        $category = $this->_registry->registry('current_category');
        if($action == 'catalog_category_view' && $category){
            $layout->getUpdate()->addHandle('catalog_category_view_grid');
			return $this;
        }
		
		/* Product page */
		$product = $this->_registry->registry('product');
		if($action == 'catalog_product_view' && $product){
            $layout->getUpdate()->addHandle('catalog_product_view_layout1');
			return $this;
		}
        return $this;
    }

}
?>