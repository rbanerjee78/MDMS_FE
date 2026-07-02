import os
import re

components_dir = r"c:\Users\Rahul\OneDrive\Documents\React_Projects\MDMS_FE\src\components"

files = {
    "Aggregation.js": "data",
    "CommsData.js": "data",
    "ConsumptionAnalysis.js": "data",
    "PerformanceFactors.js": "data",
    "Prepaid.js": "data",
    "ServiceOrders.js": "data",
    "VeeReport.js": "mockVeeData",
    "AssetManagement.js": "props.assets",
    "DeviceProfiles.js": "props.devices",
    "CustomerDevices.js": "devices",
    "Telemetry.js": "props.telemetry"
}

for filename, var_name in files.items():
    filepath = os.path.join(components_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = re.sub(r'(<PageHeader\s+title="[^"]*"\s+subtitle="[^"]*")\s*/>', 
                         rf'\1 exportData={{{var_name}}} />', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Done")
