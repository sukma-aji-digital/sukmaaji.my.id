---
title: "Python Data Science: Pandas, NumPy & Machine Learning Mastery 2025"
date: "2025-09-09"
excerpt: "Panduan komprehensif Python untuk data science dengan Pandas untuk manipulasi data, NumPy untuk komputasi numerik, dan implementasi machine learning yang praktis dan scalable."
author: "Muhammad Aji Sukma"
tags: ["Python", "Data Science", "Pandas", "NumPy", "Machine Learning"]
image: "/images/banner.png"
---

### Artikel ini sepenuhnya ditulis oleh teknologi AI ( Claude Sonnet 4 ) dan direview Oleh Muhammad Aji Sukma

Python telah menjadi bahasa pemrograman #1 untuk data science berkat ecosystem yang rich dan library-library powerful seperti Pandas, NumPy, dan Scikit-learn. Dalam artikel ini, kita akan membahas secara mendalam bagaimana menggunakan Python untuk data analysis, manipulation, dan machine learning yang production-ready.

## 🎯 Mengapa Python Dominan di Data Science?

### Keunggulan Python untuk Data Science

**1. Rich Ecosystem & Libraries**
Python memiliki ecosystem yang sangat lengkap untuk data science workflow.

```python
# Essential data science imports
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import warnings
warnings.filterwarnings('ignore')

# Configure plotting
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")
```

**2. Readable & Intuitive Syntax**
Python code mudah dibaca dan dipahami, sangat penting untuk collaborative data science projects.

```python
# Contoh data analysis workflow yang intuitive
def analyze_sales_data(data):
    """
    Comprehensive sales data analysis
    """
    print("📊 Sales Data Analysis Report")
    print("=" * 50)

    # Basic statistics
    print(f"📈 Dataset Shape: {data.shape}")
    print(f"📅 Date Range: {data['date'].min()} to {data['date'].max()}")
    print(f"💰 Total Revenue: ${data['revenue'].sum():,.2f}")
    print(f"📦 Total Orders: {data['order_id'].nunique():,}")

    # Monthly trends
    monthly_revenue = data.groupby(data['date'].dt.to_period('M'))['revenue'].sum()
    print(f"📈 Average Monthly Revenue: ${monthly_revenue.mean():,.2f}")
    print(f"📊 Revenue Growth Rate: {((monthly_revenue.iloc[-1] / monthly_revenue.iloc[0]) - 1) * 100:.1f}%")

    return {
        'monthly_trends': monthly_revenue,
        'top_products': data.groupby('product')['revenue'].sum().sort_values(ascending=False).head(10),
        'customer_segments': data.groupby('customer_segment').agg({
            'revenue': ['sum', 'mean', 'count']
        }).round(2)
    }

# Usage dengan synthetic data
np.random.seed(42)
dates = pd.date_range('2024-01-01', '2024-12-31', freq='D')
sample_data = pd.DataFrame({
    'date': np.random.choice(dates, 10000),
    'order_id': range(10000),
    'product': np.random.choice(['Laptop', 'Phone', 'Tablet', 'Watch', 'Headphones'], 10000),
    'customer_segment': np.random.choice(['Premium', 'Standard', 'Basic'], 10000, p=[0.2, 0.5, 0.3]),
    'revenue': np.random.lognormal(mean=5, sigma=1, size=10000)
})

analysis_results = analyze_sales_data(sample_data)
```

## 📊 Pandas: Data Manipulation & Analysis

### Advanced DataFrame Operations

```python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class DataProcessor:
    """
    Advanced data processing class dengan best practices
    """

    def __init__(self, data_path=None, data=None):
        if data_path:
            self.df = self.load_data(data_path)
        elif data is not None:
            self.df = data.copy()
        else:
            self.df = pd.DataFrame()

        self.original_shape = self.df.shape
        self.processing_log = []

    def load_data(self, file_path, **kwargs):
        """
        Smart data loading dengan auto-detection
        """
        file_extension = file_path.split('.')[-1].lower()

        loaders = {
            'csv': pd.read_csv,
            'xlsx': pd.read_excel,
            'json': pd.read_json,
            'parquet': pd.read_parquet,
            'pkl': pd.read_pickle
        }

        if file_extension in loaders:
            try:
                df = loaders[file_extension](file_path, **kwargs)
                self.log_operation(f"Loaded {df.shape[0]:,} rows from {file_path}")
                return df
            except Exception as e:
                raise Exception(f"Error loading {file_path}: {str(e)}")
        else:
            raise ValueError(f"Unsupported file format: {file_extension}")

    def profile_data(self):
        """
        Comprehensive data profiling
        """
        profile = {
            'basic_info': {
                'shape': self.df.shape,
                'memory_usage': f"{self.df.memory_usage(deep=True).sum() / 1024**2:.2f} MB",
                'dtypes': dict(self.df.dtypes.value_counts()),
            },
            'missing_data': {
                col: {
                    'count': self.df[col].isnull().sum(),
                    'percentage': (self.df[col].isnull().sum() / len(self.df)) * 100
                }
                for col in self.df.columns if self.df[col].isnull().sum() > 0
            },
            'duplicates': {
                'count': self.df.duplicated().sum(),
                'percentage': (self.df.duplicated().sum() / len(self.df)) * 100
            },
            'numeric_summary': self.df.describe().to_dict(),
            'categorical_summary': {
                col: {
                    'unique_values': self.df[col].nunique(),
                    'top_values': dict(self.df[col].value_counts().head().to_dict())
                }
                for col in self.df.select_dtypes(include=['object']).columns
            }
        }

        return profile

    def clean_data(self, strategy='smart'):
        """
        Intelligent data cleaning
        """
        original_rows = len(self.df)

        if strategy == 'smart':
            # Remove columns dengan > 70% missing values
            high_missing_cols = [
                col for col in self.df.columns
                if (self.df[col].isnull().sum() / len(self.df)) > 0.7
            ]
            if high_missing_cols:
                self.df = self.df.drop(columns=high_missing_cols)
                self.log_operation(f"Dropped {len(high_missing_cols)} high-missing columns")

            # Fill missing values intelligently
            for col in self.df.columns:
                if self.df[col].isnull().sum() > 0:
                    if self.df[col].dtype in ['int64', 'float64']:
                        # Numeric: use median
                        self.df[col] = self.df[col].fillna(self.df[col].median())
                    else:
                        # Categorical: use mode atau 'Unknown'
                        mode_value = self.df[col].mode()
                        fill_value = mode_value[0] if len(mode_value) > 0 else 'Unknown'
                        self.df[col] = self.df[col].fillna(fill_value)

            # Remove exact duplicates
            before_dedup = len(self.df)
            self.df = self.df.drop_duplicates()
            duplicates_removed = before_dedup - len(self.df)

            if duplicates_removed > 0:
                self.log_operation(f"Removed {duplicates_removed} duplicate rows")

        self.log_operation(f"Data cleaning completed: {original_rows:,} → {len(self.df):,} rows")
        return self

    def feature_engineering(self):
        """
        Advanced feature engineering
        """
        # Detect date columns dan create date features
        for col in self.df.columns:
            if self.df[col].dtype == 'object':
                try:
                    # Try to convert to datetime
                    dt_series = pd.to_datetime(self.df[col], errors='ignore', infer_datetime_format=True)
                    if dt_series.dtype == 'datetime64[ns]':
                        self.df[col] = dt_series

                        # Create date-based features
                        self.df[f'{col}_year'] = dt_series.dt.year
                        self.df[f'{col}_month'] = dt_series.dt.month
                        self.df[f'{col}_quarter'] = dt_series.dt.quarter
                        self.df[f'{col}_dayofweek'] = dt_series.dt.dayofweek
                        self.df[f'{col}_is_weekend'] = dt_series.dt.dayofweek.isin([5, 6])

                        self.log_operation(f"Created date features for {col}")
                except:
                    continue

        # Create interaction features untuk numeric columns
        numeric_cols = self.df.select_dtypes(include=[np.number]).columns.tolist()
        if len(numeric_cols) >= 2:
            # Create ratios for first few numeric columns
            for i in range(min(3, len(numeric_cols))):
                for j in range(i + 1, min(3, len(numeric_cols))):
                    col1, col2 = numeric_cols[i], numeric_cols[j]
                    if (self.df[col2] != 0).all():  # Avoid division by zero
                        self.df[f'{col1}_{col2}_ratio'] = self.df[col1] / self.df[col2]
                        self.log_operation(f"Created ratio feature: {col1}/{col2}")

        return self

    def detect_outliers(self, method='iqr', factor=1.5):
        """
        Intelligent outlier detection
        """
        outliers_info = {}
        numeric_cols = self.df.select_dtypes(include=[np.number]).columns

        for col in numeric_cols:
            if method == 'iqr':
                Q1 = self.df[col].quantile(0.25)
                Q3 = self.df[col].quantile(0.75)
                IQR = Q3 - Q1
                lower_bound = Q1 - factor * IQR
                upper_bound = Q3 + factor * IQR

                outliers_mask = (self.df[col] < lower_bound) | (self.df[col] > upper_bound)
                outliers_count = outliers_mask.sum()

                if outliers_count > 0:
                    outliers_info[col] = {
                        'count': outliers_count,
                        'percentage': (outliers_count / len(self.df)) * 100,
                        'bounds': (lower_bound, upper_bound)
                    }

            elif method == 'zscore':
                z_scores = np.abs((self.df[col] - self.df[col].mean()) / self.df[col].std())
                outliers_mask = z_scores > factor
                outliers_count = outliers_mask.sum()

                if outliers_count > 0:
                    outliers_info[col] = {
                        'count': outliers_count,
                        'percentage': (outliers_count / len(self.df)) * 100,
                        'threshold': factor
                    }

        return outliers_info

    def advanced_aggregations(self, group_cols, agg_col, custom_funcs=None):
        """
        Advanced aggregation dengan custom functions
        """
        default_funcs = ['mean', 'median', 'std', 'min', 'max', 'count']

        # Custom aggregation functions
        def coefficient_of_variation(x):
            return x.std() / x.mean() if x.mean() != 0 else 0

        def percentile_90(x):
            return np.percentile(x, 90)

        def percentile_10(x):
            return np.percentile(x, 10)

        custom_aggs = {
            'cv': coefficient_of_variation,
            'p90': percentile_90,
            'p10': percentile_10,
            'range': lambda x: x.max() - x.min(),
            'skewness': lambda x: x.skew(),
        }

        if custom_funcs:
            custom_aggs.update(custom_funcs)

        # Perform aggregation
        agg_funcs = default_funcs + list(custom_aggs.keys())

        try:
            # Pandas aggregation dengan custom functions
            result = self.df.groupby(group_cols)[agg_col].agg(
                mean='mean',
                median='median',
                std='std',
                min='min',
                max='max',
                count='count',
                **custom_aggs
            ).round(3)

            self.log_operation(f"Aggregated {agg_col} by {group_cols} with {len(agg_funcs)} functions")
            return result

        except Exception as e:
            print(f"Aggregation error: {e}")
            return None

    def time_series_analysis(self, date_col, value_col, freq='D'):
        """
        Time series analysis dan forecasting preparation
        """
        if date_col not in self.df.columns:
            raise ValueError(f"Date column '{date_col}' not found")

        # Ensure datetime type
        self.df[date_col] = pd.to_datetime(self.df[date_col])

        # Create time series
        ts_data = self.df.groupby(pd.Grouper(key=date_col, freq=freq))[value_col].sum()

        # Basic time series features
        analysis = {
            'trend': {
                'slope': np.polyfit(range(len(ts_data)), ts_data.values, 1)[0],
                'correlation': np.corrcoef(range(len(ts_data)), ts_data.values)[0, 1]
            },
            'seasonality': {
                'monthly': ts_data.groupby(ts_data.index.month).mean().to_dict(),
                'weekday': ts_data.groupby(ts_data.index.dayofweek).mean().to_dict() if freq == 'D' else {}
            },
            'statistics': {
                'mean': ts_data.mean(),
                'std': ts_data.std(),
                'min': ts_data.min(),
                'max': ts_data.max(),
                'growth_rate': (ts_data.iloc[-1] / ts_data.iloc[0] - 1) * 100 if len(ts_data) > 1 else 0
            }
        }

        return ts_data, analysis

    def log_operation(self, operation):
        """Log processing operations"""
        self.processing_log.append({
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'operation': operation
        })

    def get_processing_summary(self):
        """Get summary of all operations"""
        return {
            'original_shape': self.original_shape,
            'current_shape': self.df.shape,
            'operations': self.processing_log
        }

# Example usage dengan real-world data
def demonstrate_advanced_pandas():
    """
    Demonstrate advanced pandas operations
    """
    print("🐼 Advanced Pandas Operations Demo")
    print("=" * 50)

    # Create sample e-commerce data
    np.random.seed(42)
    n_records = 50000

    data = {
        'order_date': pd.date_range('2023-01-01', '2024-12-31', periods=n_records),
        'customer_id': np.random.randint(1000, 10000, n_records),
        'product_category': np.random.choice(['Electronics', 'Clothing', 'Books', 'Home', 'Sports'], n_records),
        'product_name': [f"Product_{i}" for i in np.random.randint(1, 1000, n_records)],
        'quantity': np.random.randint(1, 10, n_records),
        'unit_price': np.random.lognormal(3, 1, n_records),
        'discount_pct': np.random.choice([0, 5, 10, 15, 20], n_records, p=[0.4, 0.3, 0.2, 0.08, 0.02]),
        'customer_age': np.random.randint(18, 80, n_records),
        'customer_city': np.random.choice(['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar'], n_records)
    }

    # Add some missing values dan duplicates
    df = pd.DataFrame(data)
    df.loc[np.random.choice(df.index, 1000), 'customer_age'] = np.nan
    df.loc[np.random.choice(df.index, 500), 'discount_pct'] = np.nan

    # Initialize processor
    processor = DataProcessor(data=df)

    # Profile data
    print("📊 Data Profiling Results:")
    profile = processor.profile_data()
    print(f"Shape: {profile['basic_info']['shape']}")
    print(f"Memory: {profile['basic_info']['memory_usage']}")
    print(f"Missing data columns: {len(profile['missing_data'])}")

    # Clean data
    processor.clean_data()

    # Feature engineering
    processor.feature_engineering()

    # Calculate total amount
    processor.df['total_amount'] = (processor.df['quantity'] * processor.df['unit_price'] *
                                   (1 - processor.df['discount_pct'] / 100))

    # Advanced aggregations
    print("\n📈 Advanced Aggregations:")
    agg_result = processor.advanced_aggregations(
        group_cols=['product_category'],
        agg_col='total_amount'
    )
    print(agg_result.head())

    # Time series analysis
    print("\n📅 Time Series Analysis:")
    ts_data, ts_analysis = processor.time_series_analysis('order_date', 'total_amount', 'M')
    print(f"Monthly sales trend slope: {ts_analysis['trend']['slope']:.2f}")
    print(f"Average monthly sales: ${ts_analysis['statistics']['mean']:,.2f}")

    # Outlier detection
    print("\n🔍 Outlier Detection:")
    outliers = processor.detect_outliers(method='iqr')
    for col, info in outliers.items():
        print(f"{col}: {info['count']} outliers ({info['percentage']:.1f}%)")

    # Processing summary
    summary = processor.get_processing_summary()
    print(f"\n✅ Processing completed: {summary['original_shape']} → {summary['current_shape']}")
    print(f"Operations performed: {len(summary['operations'])}")

    return processor.df

# Run demonstration
processed_data = demonstrate_advanced_pandas()
```

## 🔢 NumPy: High-Performance Computing

### Advanced Array Operations & Vectorization

```python
import numpy as np
from numba import jit, vectorize
import time

class NumPyOptimizer:
    """
    Advanced NumPy operations dengan performance optimization
    """

    @staticmethod
    def demonstrate_vectorization():
        """
        Show power of vectorization vs loops
        """
        print("⚡ Vectorization Performance Comparison")
        print("=" * 50)

        # Large array untuk testing
        n = 1_000_000
        arr1 = np.random.rand(n)
        arr2 = np.random.rand(n)

        # Method 1: Pure Python loop (SLOW)
        def python_loop_multiply(a, b):
            result = []
            for i in range(len(a)):
                result.append(a[i] * b[i])
            return result

        # Method 2: List comprehension (BETTER)
        def list_comp_multiply(a, b):
            return [a[i] * b[i] for i in range(len(a))]

        # Method 3: NumPy vectorization (BEST)
        def numpy_multiply(a, b):
            return a * b

        # Performance comparison
        methods = [
            ("Python Loop", lambda: python_loop_multiply(arr1[:1000], arr2[:1000])),  # Smaller sample
            ("List Comprehension", lambda: list_comp_multiply(arr1[:1000], arr2[:1000])),
            ("NumPy Vectorization", lambda: numpy_multiply(arr1, arr2))
        ]

        for name, func in methods:
            start_time = time.time()
            result = func()
            end_time = time.time()
            print(f"{name:20}: {(end_time - start_time)*1000:.3f} ms")

        return arr1, arr2

    @staticmethod
    def advanced_array_operations():
        """
        Demonstrate advanced NumPy operations
        """
        print("\n🔢 Advanced NumPy Operations")
        print("=" * 50)

        # Create sample data: sales data by region dan month
        np.random.seed(42)
        regions = 5
        months = 12
        products = 20

        # 3D array: regions × months × products
        sales_data = np.random.lognormal(mean=8, sigma=1, size=(regions, months, products))

        print(f"Sales data shape: {sales_data.shape}")
        print(f"Total sales: ${sales_data.sum():,.2f}")

        # Advanced indexing dan slicing
        print("\n📊 Advanced Indexing Examples:")

        # Boolean indexing: find high-performing products
        high_sales_mask = sales_data > np.percentile(sales_data, 90)
        high_sales_count = high_sales_mask.sum()
        print(f"High-performing sales (>90th percentile): {high_sales_count}")

        # Fancy indexing: select specific regions dan months
        selected_regions = [0, 2, 4]  # First, third, fifth region
        selected_months = [0, 5, 11]  # January, June, December
        subset = sales_data[np.ix_(selected_regions, selected_months)]
        print(f"Subset shape: {subset.shape}")

        # Aggregations across different axes
        print("\n📈 Aggregation Results:")
        total_by_region = sales_data.sum(axis=(1, 2))  # Sum across months dan products
        total_by_month = sales_data.sum(axis=(0, 2))   # Sum across regions dan products
        total_by_product = sales_data.sum(axis=(0, 1)) # Sum across regions dan months

        print(f"Best region (total sales): Region {total_by_region.argmax()} - ${total_by_region.max():,.2f}")
        print(f"Best month (total sales): Month {total_by_month.argmax() + 1} - ${total_by_month.max():,.2f}")
        print(f"Best product (total sales): Product {total_by_product.argmax() + 1} - ${total_by_product.max():,.2f}")

        return sales_data, total_by_region, total_by_month, total_by_product

    @staticmethod
    def statistical_operations():
        """
        Advanced statistical operations dengan NumPy
        """
        print("\n📊 Statistical Analysis with NumPy")
        print("=" * 50)

        # Generate sample data: customer transaction amounts
        np.random.seed(42)

        # Different customer segments with different spending patterns
        premium_customers = np.random.lognormal(mean=6, sigma=0.5, size=1000)  # High spenders
        standard_customers = np.random.lognormal(mean=4.5, sigma=0.7, size=5000)  # Medium spenders
        basic_customers = np.random.lognormal(mean=3, sigma=0.8, size=10000)  # Low spenders

        all_customers = np.concatenate([premium_customers, standard_customers, basic_customers])

        # Comprehensive statistical analysis
        stats = {
            'mean': np.mean(all_customers),
            'median': np.median(all_customers),
            'std': np.std(all_customers),
            'var': np.var(all_customers),
            'min': np.min(all_customers),
            'max': np.max(all_customers),
            'q25': np.percentile(all_customers, 25),
            'q75': np.percentile(all_customers, 75),
            'iqr': np.percentile(all_customers, 75) - np.percentile(all_customers, 25),
            'skewness': None,  # Will calculate manually
            'kurtosis': None   # Will calculate manually
        }

        # Manual skewness calculation
        mean_val = stats['mean']
        std_val = stats['std']
        skewness = np.mean(((all_customers - mean_val) / std_val) ** 3)
        kurtosis = np.mean(((all_customers - mean_val) / std_val) ** 4) - 3

        stats['skewness'] = skewness
        stats['kurtosis'] = kurtosis

        print("Customer Spending Statistics:")
        for key, value in stats.items():
            if value is not None:
                print(f"{key.upper():12}: ${value:8.2f}" if 'q' not in key.lower() and key not in ['skewness', 'kurtosis']
                     else f"{key.upper():12}: {value:8.3f}")

        # Advanced operations: correlation dan covariance
        print("\n🔗 Correlation Analysis:")

        # Create correlated variables
        spending = all_customers
        age = 25 + 40 * np.random.random(len(spending)) + 0.3 * spending + np.random.normal(0, 5, len(spending))
        income = 30000 + 2 * spending + np.random.normal(0, 10000, len(spending))

        # Correlation matrix
        data_matrix = np.column_stack([spending, age, income])
        correlation_matrix = np.corrcoef(data_matrix.T)

        variables = ['Spending', 'Age', 'Income']
        print("Correlation Matrix:")
        print(f"{'':12}", end='')
        for var in variables:
            print(f"{var:>12}", end='')
        print()

        for i, var in enumerate(variables):
            print(f"{var:12}", end='')
            for j in range(len(variables)):
                print(f"{correlation_matrix[i, j]:12.3f}", end='')
            print()

        return all_customers, data_matrix, correlation_matrix

    @staticmethod
    @jit(nopython=True)  # Numba JIT compilation untuk speed
    def monte_carlo_pi(n_points):
        """
        Monte Carlo estimation of π menggunakan Numba untuk speed
        """
        count_inside = 0
        for i in range(n_points):
            x = np.random.random()
            y = np.random.random()
            if x*x + y*y <= 1:
                count_inside += 1
        return 4.0 * count_inside / n_points

    @staticmethod
    def performance_optimization_demo():
        """
        Demonstrate performance optimization techniques
        """
        print("\n🚀 Performance Optimization Demo")
        print("=" * 50)

        # Compare different approaches untuk matrix operations
        n = 1000
        A = np.random.rand(n, n)
        B = np.random.rand(n, n)

        print(f"Matrix size: {n}×{n}")

        # Method 1: Pure NumPy
        start_time = time.time()
        C1 = np.dot(A, B)
        numpy_time = time.time() - start_time
        print(f"NumPy dot product:     {numpy_time:.4f} seconds")

        # Method 2: @ operator (Python 3.5+)
        start_time = time.time()
        C2 = A @ B
        at_operator_time = time.time() - start_time
        print(f"@ operator:            {at_operator_time:.4f} seconds")

        # Method 3: Using BLAS directly (if available)
        try:
            from scipy.linalg.blas import dgemm
            start_time = time.time()
            C3 = dgemm(1.0, A, B)
            blas_time = time.time() - start_time
            print(f"Direct BLAS:           {blas_time:.4f} seconds")
        except ImportError:
            print("BLAS not available")

        # Memory-efficient operations
        print("\n💾 Memory Efficiency Demo:")

        # In-place operations
        large_array = np.random.rand(10000, 1000)
        original_memory = large_array.nbytes / (1024**2)  # MB
        print(f"Original array size: {original_memory:.2f} MB")

        # Non-in-place (creates copy)
        start_time = time.time()
        result1 = large_array * 2 + 1
        copy_time = time.time() - start_time
        copy_memory = result1.nbytes / (1024**2)

        # In-place operations (more memory efficient)
        large_array_copy = large_array.copy()
        start_time = time.time()
        large_array_copy *= 2
        large_array_copy += 1
        inplace_time = time.time() - start_time

        print(f"Copy operation:   {copy_time:.4f} seconds, {copy_memory:.2f} MB extra")
        print(f"In-place operation: {inplace_time:.4f} seconds, 0 MB extra")

        # Monte Carlo π estimation dengan Numba
        print("\n🎲 Monte Carlo π Estimation (with Numba JIT):")
        for n_points in [10_000, 100_000, 1_000_000]:
            start_time = time.time()
            pi_estimate = NumPyOptimizer.monte_carlo_pi(n_points)
            end_time = time.time()
            error = abs(pi_estimate - np.pi) / np.pi * 100
            print(f"n={n_points:8,}: π≈{pi_estimate:.6f}, error={error:.3f}%, time={end_time-start_time:.4f}s")

# Run NumPy demonstrations
numpy_optimizer = NumPyOptimizer()

# Vectorization demo
arr1, arr2 = numpy_optimizer.demonstrate_vectorization()

# Advanced operations
sales_data, region_totals, month_totals, product_totals = numpy_optimizer.advanced_array_operations()

# Statistical analysis
customer_data, data_matrix, corr_matrix = numpy_optimizer.statistical_operations()

# Performance optimization
numpy_optimizer.performance_optimization_demo()
```

## 🤖 Machine Learning Implementation

### Complete ML Pipeline dengan Scikit-learn

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
import matplotlib.pyplot as plt
import seaborn as sns

class MLPipeline:
    """
    Production-ready Machine Learning Pipeline
    """

    def __init__(self, problem_type='classification'):
        self.problem_type = problem_type
        self.models = {}
        self.best_model = None
        self.preprocessor = None
        self.feature_importance = None
        self.performance_metrics = {}

    def load_and_prepare_data(self, data_path=None, data=None, target_column=None):
        """
        Load dan prepare data untuk ML
        """
        if data_path:
            self.df = pd.read_csv(data_path)
        elif data is not None:
            self.df = data.copy()
        else:
            # Create sample data for demonstration
            self.df = self._create_sample_data()

        if target_column:
            self.target_column = target_column
        else:
            # Auto-detect target (assuming last column)
            self.target_column = self.df.columns[-1]

        print(f"📊 Dataset loaded: {self.df.shape}")
        print(f"🎯 Target column: {self.target_column}")
        print(f"📈 Target distribution:\n{self.df[self.target_column].value_counts()}")

        return self.df

    def _create_sample_data(self):
        """
        Create sample customer churn dataset
        """
        np.random.seed(42)
        n_customers = 10000

        # Customer features
        data = {
            'customer_id': range(1, n_customers + 1),
            'age': np.random.randint(18, 80, n_customers),
            'tenure_months': np.random.randint(1, 72, n_customers),
            'monthly_charges': np.random.normal(65, 20, n_customers),
            'total_charges': np.random.normal(2000, 1500, n_customers),
            'contract_type': np.random.choice(['Month-to-month', '1-year', '2-year'], n_customers, p=[0.5, 0.3, 0.2]),
            'payment_method': np.random.choice(['Electronic check', 'Mailed check', 'Bank transfer', 'Credit card'], n_customers),
            'internet_service': np.random.choice(['DSL', 'Fiber optic', 'No'], n_customers, p=[0.4, 0.4, 0.2]),
            'online_security': np.random.choice(['Yes', 'No', 'No internet service'], n_customers, p=[0.3, 0.5, 0.2]),
            'tech_support': np.random.choice(['Yes', 'No', 'No internet service'], n_customers, p=[0.3, 0.5, 0.2]),
            'streaming_tv': np.random.choice(['Yes', 'No', 'No internet service'], n_customers, p=[0.3, 0.5, 0.2]),
            'paperless_billing': np.random.choice(['Yes', 'No'], n_customers, p=[0.6, 0.4]),
            'senior_citizen': np.random.choice([0, 1], n_customers, p=[0.8, 0.2])
        }

        df = pd.DataFrame(data)

        # Create target variable (churn) dengan realistic logic
        churn_prob = (
            0.1 +  # Base churn rate
            0.3 * (df['contract_type'] == 'Month-to-month') +  # Higher churn untuk month-to-month
            0.2 * (df['monthly_charges'] > 80) +  # Higher churn untuk expensive plans
            0.15 * (df['tenure_months'] < 12) +  # Higher churn untuk new customers
            0.1 * (df['tech_support'] == 'No') +  # Higher churn tanpa tech support
            0.05 * df['senior_citizen'] +  # Slightly higher churn untuk seniors
            np.random.normal(0, 0.1, n_customers)  # Random noise
        )

        # Clip probabilities dan convert to binary
        churn_prob = np.clip(churn_prob, 0, 1)
        df['churn'] = np.random.binomial(1, churn_prob, n_customers)

        # Drop customer_id (not a feature)
        df = df.drop('customer_id', axis=1)

        print("✅ Sample customer churn dataset created")
        return df

    def exploratory_data_analysis(self):
        """
        Comprehensive EDA
        """
        print("\n📊 Exploratory Data Analysis")
        print("=" * 50)

        # Basic info
        print(f"Dataset shape: {self.df.shape}")
        print(f"Missing values: {self.df.isnull().sum().sum()}")
        print(f"Duplicate rows: {self.df.duplicated().sum()}")

        # Target distribution
        target_dist = self.df[self.target_column].value_counts()
        print(f"\nTarget distribution:")
        for value, count in target_dist.items():
            percentage = (count / len(self.df)) * 100
            print(f"  {value}: {count} ({percentage:.1f}%)")

        # Correlation analysis untuk numeric features
        numeric_features = self.df.select_dtypes(include=[np.number]).columns.tolist()
        if self.target_column in numeric_features:
            numeric_features.remove(self.target_column)

        if len(numeric_features) > 1:
            correlation_with_target = self.df[numeric_features + [self.target_column]].corr()[self.target_column].abs().sort_values(ascending=False)
            print(f"\nTop correlations with target:")
            for feature in correlation_with_target.index[1:6]:  # Skip target itself, show top 5
                corr_val = correlation_with_target[feature]
                print(f"  {feature}: {corr_val:.3f}")

        # Categorical features analysis
        categorical_features = self.df.select_dtypes(include=['object']).columns.tolist()
        if self.target_column in categorical_features:
            categorical_features.remove(self.target_column)

        if len(categorical_features) > 0:
            print(f"\nCategorical features summary:")
            for feature in categorical_features[:5]:  # Show first 5
                unique_count = self.df[feature].nunique()
                print(f"  {feature}: {unique_count} unique values")

        return {
            'numeric_features': numeric_features,
            'categorical_features': categorical_features,
            'target_distribution': target_dist
        }

    def feature_engineering(self, numeric_features, categorical_features):
        """
        Advanced feature engineering
        """
        print("\n🔧 Feature Engineering")
        print("=" * 50)

        # Create feature engineering pipeline
        numeric_transformer = Pipeline(steps=[
            ('scaler', StandardScaler())
        ])

        categorical_transformer = Pipeline(steps=[
            ('onehot', OneHotEncoder(drop='first', sparse_output=False))
        ])

        # Combine preprocessing steps
        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', numeric_transformer, numeric_features),
                ('cat', categorical_transformer, categorical_features)
            ]
        )

        # Additional feature engineering
        df_engineered = self.df.copy()

        # Create interaction features
        if 'monthly_charges' in df_engineered.columns and 'tenure_months' in df_engineered.columns:
            df_engineered['total_charges_estimated'] = df_engineered['monthly_charges'] * df_engineered['tenure_months']
            df_engineered['charges_per_month'] = df_engineered['total_charges'] / (df_engineered['tenure_months'] + 1)

        if 'age' in df_engineered.columns and 'tenure_months' in df_engineered.columns:
            df_engineered['customer_lifetime_ratio'] = df_engineered['tenure_months'] / df_engineered['age']

        # Binning numerical features
        if 'age' in df_engineered.columns:
            df_engineered['age_group'] = pd.cut(df_engineered['age'],
                                               bins=[0, 30, 50, 70, 100],
                                               labels=['Young', 'Middle', 'Senior', 'Elder'])

        if 'monthly_charges' in df_engineered.columns:
            df_engineered['charge_tier'] = pd.qcut(df_engineered['monthly_charges'],
                                                  q=4,
                                                  labels=['Low', 'Medium', 'High', 'Premium'])

        self.df_engineered = df_engineered

        # Update feature lists
        new_numeric = [col for col in df_engineered.select_dtypes(include=[np.number]).columns
                      if col != self.target_column]
        new_categorical = [col for col in df_engineered.select_dtypes(include=['object', 'category']).columns
                          if col != self.target_column]

        print(f"Original features: {len(numeric_features + categorical_features)}")
        print(f"Engineered features: {len(new_numeric + new_categorical)}")

        return new_numeric, new_categorical

    def prepare_model_data(self, test_size=0.2, random_state=42):
        """
        Prepare data untuk modeling
        """
        # Separate features dan target
        X = self.df_engineered.drop(self.target_column, axis=1)
        y = self.df_engineered[self.target_column]

        # Train-test split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state, stratify=y
        )

        print(f"Training set: {X_train.shape}")
        print(f"Test set: {X_test.shape}")

        self.X_train, self.X_test = X_train, X_test
        self.y_train, self.y_test = y_train, y_test

        return X_train, X_test, y_train, y_test

    def train_models(self):
        """
        Train multiple models dan compare performance
        """
        print("\n🤖 Training Multiple Models")
        print("=" * 50)

        # Define models
        models = {
            'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000),
            'Random Forest': RandomForestClassifier(random_state=42, n_estimators=100),
            'Gradient Boosting': GradientBoostingClassifier(random_state=42, n_estimators=100),
            'SVM': SVC(random_state=42, probability=True)
        }

        # Train dan evaluate setiap model
        for name, model in models.items():
            # Create pipeline dengan preprocessing
            pipeline = Pipeline([
                ('preprocessor', self.preprocessor),
                ('classifier', model)
            ])

            # Cross-validation
            cv_scores = cross_val_score(pipeline, self.X_train, self.y_train, cv=5, scoring='roc_auc')

            # Train pada full training set
            pipeline.fit(self.X_train, self.y_train)

            # Predictions
            y_pred = pipeline.predict(self.X_test)
            y_pred_proba = pipeline.predict_proba(self.X_test)[:, 1]

            # Metrics
            roc_auc = roc_auc_score(self.y_test, y_pred_proba)

            # Store model dan metrics
            self.models[name] = {
                'pipeline': pipeline,
                'cv_scores': cv_scores,
                'roc_auc': roc_auc,
                'predictions': y_pred,
                'probabilities': y_pred_proba
            }

            print(f"{name:20}: CV AUC = {cv_scores.mean():.3f} (±{cv_scores.std()*2:.3f}), Test AUC = {roc_auc:.3f}")

        # Select best model
        best_model_name = max(self.models.keys(), key=lambda k: self.models[k]['roc_auc'])
        self.best_model = self.models[best_model_name]

        print(f"\n🏆 Best model: {best_model_name} (AUC: {self.best_model['roc_auc']:.3f})")

        return self.models

    def hyperparameter_tuning(self, model_name='Random Forest'):
        """
        Hyperparameter tuning untuk selected model
        """
        print(f"\n🔍 Hyperparameter Tuning for {model_name}")
        print("=" * 50)

        # Parameter grids
        param_grids = {
            'Random Forest': {
                'classifier__n_estimators': [50, 100, 200],
                'classifier__max_depth': [10, 20, None],
                'classifier__min_samples_split': [2, 5, 10],
                'classifier__min_samples_leaf': [1, 2, 4]
            },
            'Gradient Boosting': {
                'classifier__n_estimators': [50, 100, 200],
                'classifier__learning_rate': [0.01, 0.1, 0.2],
                'classifier__max_depth': [3, 5, 7],
                'classifier__min_samples_split': [2, 5, 10]
            },
            'Logistic Regression': {
                'classifier__C': [0.01, 0.1, 1, 10, 100],
                'classifier__penalty': ['l1', 'l2'],
                'classifier__solver': ['liblinear', 'saga']
            }
        }

        if model_name in param_grids:
            # Base model
            if model_name == 'Random Forest':
                base_model = RandomForestClassifier(random_state=42)
            elif model_name == 'Gradient Boosting':
                base_model = GradientBoostingClassifier(random_state=42)
            elif model_name == 'Logistic Regression':
                base_model = LogisticRegression(random_state=42, max_iter=1000)

            # Create pipeline
            pipeline = Pipeline([
                ('preprocessor', self.preprocessor),
                ('classifier', base_model)
            ])

            # Grid search
            grid_search = GridSearchCV(
                pipeline,
                param_grids[model_name],
                cv=5,
                scoring='roc_auc',
                n_jobs=-1,
                verbose=1
            )

            grid_search.fit(self.X_train, self.y_train)

            # Best model results
            best_score = grid_search.best_score_
            best_params = grid_search.best_params_

            print(f"Best CV AUC: {best_score:.3f}")
            print("Best parameters:")
            for param, value in best_params.items():
                print(f"  {param}: {value}")

            # Update best model
            self.best_model = {
                'pipeline': grid_search.best_estimator_,
                'cv_score': best_score,
                'best_params': best_params
            }

            return grid_search
        else:
            print(f"Parameter grid not defined for {model_name}")
            return None

    def evaluate_model(self):
        """
        Comprehensive model evaluation
        """
        print("\n📈 Model Evaluation")
        print("=" * 50)

        pipeline = self.best_model['pipeline']
        y_pred = pipeline.predict(self.X_test)
        y_pred_proba = pipeline.predict_proba(self.X_test)[:, 1]

        # Classification report
        print("Classification Report:")
        print(classification_report(self.y_test, y_pred))

        # Confusion matrix
        cm = confusion_matrix(self.y_test, y_pred)
        print(f"\nConfusion Matrix:")
        print(cm)

        # Feature importance (if available)
        if hasattr(pipeline.named_steps['classifier'], 'feature_importances_'):
            # Get feature names after preprocessing
            feature_names = self._get_feature_names()
            importance_scores = pipeline.named_steps['classifier'].feature_importances_

            # Create feature importance dataframe
            feature_importance = pd.DataFrame({
                'feature': feature_names,
                'importance': importance_scores
            }).sort_values('importance', ascending=False)

            print(f"\nTop 10 Most Important Features:")
            for idx, row in feature_importance.head(10).iterrows():
                print(f"  {row['feature']:30}: {row['importance']:.3f}")

            self.feature_importance = feature_importance

        return {
            'classification_report': classification_report(self.y_test, y_pred, output_dict=True),
            'confusion_matrix': cm,
            'roc_auc': roc_auc_score(self.y_test, y_pred_proba),
            'feature_importance': getattr(self, 'feature_importance', None)
        }

    def _get_feature_names(self):
        """
        Get feature names after preprocessing
        """
        feature_names = []

        # Numeric features (after scaling)
        numeric_features = self.preprocessor.named_transformers_['num'].get_feature_names_out()
        feature_names.extend(numeric_features)

        # Categorical features (after one-hot encoding)
        categorical_features = self.preprocessor.named_transformers_['cat'].get_feature_names_out()
        feature_names.extend(categorical_features)

        return feature_names

    def predict_new_data(self, new_data):
        """
        Make predictions pada new data
        """
        if self.best_model is None:
            raise ValueError("No trained model available. Please train a model first.")

        pipeline = self.best_model['pipeline']
        predictions = pipeline.predict(new_data)
        probabilities = pipeline.predict_proba(new_data)[:, 1]

        return predictions, probabilities

# Demonstrate complete ML pipeline
def demonstrate_ml_pipeline():
    """
    Complete demonstration of ML pipeline
    """
    print("🤖 Machine Learning Pipeline Demonstration")
    print("=" * 60)

    # Initialize pipeline
    ml_pipeline = MLPipeline(problem_type='classification')

    # Load data (using sample data)
    df = ml_pipeline.load_and_prepare_data()

    # EDA
    eda_results = ml_pipeline.exploratory_data_analysis()

    # Feature engineering
    numeric_features, categorical_features = ml_pipeline.feature_engineering(
        eda_results['numeric_features'],
        eda_results['categorical_features']
    )

    # Prepare model data
    X_train, X_test, y_train, y_test = ml_pipeline.prepare_model_data()

    # Train multiple models
    models = ml_pipeline.train_models()

    # Hyperparameter tuning (optional - comment out untuk speed)
    # ml_pipeline.hyperparameter_tuning('Random Forest')

    # Evaluate best model
    evaluation_results = ml_pipeline.evaluate_model()

    print("\n✅ ML Pipeline completed successfully!")
    print(f"Best model AUC: {evaluation_results['roc_auc']:.3f}")

    return ml_pipeline, evaluation_results

# Run ML pipeline demonstration
ml_pipeline, results = demonstrate_ml_pipeline()
```

## 🌟 Kesimpulan

Python untuk data science di 2025 menawarkan ecosystem yang sangat mature dan powerful. Dengan menguasai:

**Core Libraries:**

- ✅ **Pandas** untuk data manipulation dan analysis
- ✅ **NumPy** untuk high-performance computing
- ✅ **Matplotlib/Seaborn** untuk data visualization
- ✅ **Scikit-learn** untuk machine learning

**Advanced Techniques:**

- ✅ **Vectorization** untuk performance optimization
- ✅ **Feature Engineering** yang sophisticated
- ✅ **Pipeline Design** untuk reproducible workflows
- ✅ **Model Evaluation** yang comprehensive

**Best Practices:**

- ✅ **Data Profiling** sebelum analysis
- ✅ **Proper Preprocessing** pipelines
- ✅ **Cross-validation** untuk model reliability
- ✅ **Feature Importance** analysis

**Production Readiness:**

- ✅ **Error Handling** yang robust
- ✅ **Performance Monitoring** dan optimization
- ✅ **Code Documentation** yang comprehensive
- ✅ **Modular Design** untuk maintainability

Python ecosystem untuk data science terus berkembang dengan tools baru seperti Polars, DuckDB, dan advanced ML libraries. Namun, foundation dengan Pandas, NumPy, dan Scikit-learn tetap essential untuk success di field ini.

**Pro Tips:**

- Always profile your data before analysis
- Use vectorization untuk better performance
- Implement proper cross-validation strategies
- Document your feature engineering decisions
- Keep your models simple and interpretable when possible

Happy data science with Python! 🐍📊
