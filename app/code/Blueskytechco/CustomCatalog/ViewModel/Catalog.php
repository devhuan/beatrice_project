<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
 
namespace Blueskytechco\CustomCatalog\ViewModel;

use Magento\Store\Model\StoreManagerInterface;
use Magento\Framework\Registry;
use Magento\InventorySalesAdminUi\Model\GetSalableQuantityDataBySku;
use Magento\Framework\Pricing\PriceCurrencyInterface;

class Catalog implements \Magento\Framework\View\Element\Block\ArgumentInterface
{
    
    /**
     * @var StoreManagerInterface
     */
    private $storeManager;

    /**
     * @var \Magento\Framework\App\Request\Http
     */
    protected $request;

    /**
     * @var \Magento\Framework\ObjectManagerInterface
     */
    protected $objectmanager;

    /**
     * @var \Magento\Catalog\Model\CategoryRepository
     */
    protected $categoryRepository;

    /**
     * @var \Blueskytechco\WidgetCategory\Model\ImageUploader
     */
    protected $imageUploader;

    /**
     * @var \Magento\CatalogInventory\Api\StockStateInterface
     */
    protected $_stockState;

    /**
     * @var \Magento\Catalog\Helper\Image
     */
    protected $imageHelper;
    
    /**
     * @var GetSalableQuantityDataBySku
     */
    protected $getSalableQuantityDataBySku;

    /**
     * @var PriceCurrencyInterface
     */
    protected $priceCurrency;

    /**
     * @var Registry
     */
    protected $registry;

    /**
     * @param StoreManagerInterface $storeManager
     */
    public function __construct(
        StoreManagerInterface $storeManager,
        \Magento\Framework\App\Request\Http $request,
        \Magento\Framework\ObjectManagerInterface $objectmanager,
        \Magento\Catalog\Model\CategoryRepository $categoryRepository,
        GetSalableQuantityDataBySku $getSalableQuantityDataBySku,
        PriceCurrencyInterface $priceCurrency,
        \Magento\CatalogInventory\Api\StockStateInterface $_stockState,
        \Magento\Catalog\Helper\Image $imageHelper,
        Registry $registry
    ) {
        $this->stockState = $_stockState;
        $this->storeManager = $storeManager;
        $this->getSalableQuantityDataBySku = $getSalableQuantityDataBySku;
        $this->request = $request;
        $this->objectManager = $objectmanager;
        $this->categoryRepository = $categoryRepository;
        $this->priceCurrency = $priceCurrency;
        $this->registry = $registry;
        $this->imageHelper = $imageHelper;
    }
    

    /**
     * return params url
     */
    public function getParams()
    {
        $params = $this->request->getParams();
        return $params;
    }

    public function getImageHelper()
    {
        return $this->imageHelper;
    }

    public function getVideoUrl($url)
    {
        if (strpos($url, 'youtube') !== false) {
            $url_array = explode('v=',$url);
            if(isset($url_array[1]) && $url_array[1]){
                $id = explode('&', $url_array[1]);
                if (isset($id[0]) && $id[0]) {
                    $url = 'https://www.youtube.com/embed/'.$id[0].'';
                    return $url;
                }
            }
        }
        return false;
    }
}
