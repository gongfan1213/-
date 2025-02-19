### Lab 5 - 数据可视化
### COMP7270 - 网页与移动编程 - 香港浸会大学 - 2025年春季

在这个实验中，你将学习如何使用 **amCharts** 库结合数据库创建动态数据可视化。数据可视化是一种强大的工具，能够以视觉形式呈现和理解大量数据。通过 **amCharts**，你可以创建交互式和视觉上吸引人的图表、图形和地图。

#### 开始步骤
1. 从 Moodle 下载 zip 文件，并在 `public` 文件夹中创建一个名为 `amCharts.html` 的新文件。使用以下起始代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>amCharts</title>
</head>
<body>
    <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/map.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/geodata/worldLow.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/geodata/hongKongHigh.js"></script>

    <div id="chartdiv_map" style="width:100vw; height:100vh"></div>
    <div id="chartdiv_hk" style="width:100vw; height:100vh; background-color:AliceBlue"></div>
    <div id="chartdiv_plant" style="width:50vw; height:80vh"></div>
    <div id="chartdiv_snsd" style="width:90vw; height:100vh"></div>

    <script src="javascripts/svgPaths.js"></script>
    <script src="javascripts/map.js"></script>
    <script src="javascripts/hkMap.js"></script>
    <script src="javascripts/plant.js"></script>
    <script src="javascripts/snsd.js"></script>
</body>
</html>
```

2. 在 `/public/javascripts` 文件夹中创建一个名为 `map.js` 的文件，并实现以下代码：

```javascript
am5.ready(function () {
    // 创建根和图表
    var root = am5.Root.new("chartdiv_map");
    var chart = root.container.children.push(
        am5map.MapChart.new(root, { wheelY: "none" })
    );

    var polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow,
        })
    );
});
```

#### 如何做
1. **创建地图**：使用 `am5.Root.new()` 创建一个根对象，然后创建一个地图图表实例 `chart`，并为其提供 `MapPolygonSeries`。`MapPolygonSeries` 通常以 GeoJSON 格式提供数据，数据来自 `worldLow.js`。

2. **排除某些区域**：如果你想排除某些区域（如南极洲），可以在 `geoJSON` 后添加 `exclude: ["AQ"]`。如果你想只显示某些国家，可以使用 `include: ["AR", "BR"]`。

3. **添加工具提示**：你可以为地图上的多边形添加工具提示。例如：
   ```javascript
   polygonSeries.data.setAll([{
       id: "AR",
       worldcup: 2
   }, {
       id: "BR",
       worldcup: 5
   }]);

   polygonSeries.mapPolygons.template.setAll({
       tooltipText: "{name}: {worldcup} times",
   });
   ```

4. **设置颜色**：你可以为多边形设置颜色。例如：
   ```javascript
   polygonSeries.mapPolygons.template.setAll({
       tooltipText: "{name}: {worldcup} times",
       templateField: "polygonSettings"
   });

   polygonSeries.data.setAll([{
       id: "AR",
       worldcup: 2,
       polygonSettings: {
           fill: am5.color(0x43A1D5)
       }
   }, {
       id: "BR",
       worldcup: 5,
       polygonSettings: {
           fill: am5.color(0xFFDC02)
       }
   }]);
   ```

5. **香港地图**：你可以使用 `hongKongHigh.js` 创建一个香港地图。在 `hkmap.js` 中实现以下代码：
   ```javascript
   am5.ready(function () {
       var root = am5.Root.new("chartdiv_hk");
       var chart = root.container.children.push(
           am5map.MapChart.new(root, { wheelY: "none" })
       );

       var polygonSeries = chart.series.push(
           am5map.MapPolygonSeries.new(root, {
               geoJSON: am5geodata_hongKongHigh,
           })
       );
   });
   ```

6. **添加标题和数据**：你可以为香港地图添加标题和数据。例如：
   ```javascript
   var title = chart.children.push(am5.Label.new(root, {
       text: "Abuse cases A&E attendance by District\n(per 100,000 population)",
       fontSize: 20,
       y: 20,
       x: am5.percent(20),
       centerX: am5.p50,
       background: am5.Rectangle.new(root, {
           fill: am5.color(0xffffff),
           fillOpacity: 0.5
       })
   }));

   polygonSeries.data.setAll([
       { id: "HK-YT", value: 17.1 },
       { id: "HK-YL", value: 42.6 },
       // 其他区域数据...
   ]);

   polygonSeries.mapPolygons.template.setAll({
       tooltipText: "{name}: {value} cases"
   });
   ```

7. **热力图规则**：你可以根据数据值为区域设置颜色。例如：
   ```javascript
   polygonSeries.set("heatRules", [{
       target: polygonSeries.mapPolygons.template,
       dataField: "value",
       min: am5.color(0xdedede),
       max: am5.color(0x880000),
       key: "fill"
   }]);
   ```

8. **交互效果**：你可以为悬停的区域设置颜色。例如：
   ```javascript
   polygonSeries.mapPolygons.template.states.create("hover", {
       fill: root.interfaceColors.get("primaryButtonHover")
   });
   ```

9. **切片图表**：你可以创建一个切片图表。在 `plant.js` 中实现以下代码：
   ```javascript
   am5.ready(function () {
       var root = am5.Root.new("chartdiv_plant");
       var chart = root.container.children.push(
           am5percent.SlicedChart.new(root, {})
       );

       var series = chart.series.push(
           am5percent.PictorialStackedSeries.new(root, {
               svgPath: plantPath,
               categoryField: "name",
               valueField: "value",
           })
       );

       series.slices.template.setAll({
           tooltipText: "{name}: {value}%"
       });

       series.data.setAll([{
           name: "Dry",
           value: 33.2
       }, {
           name: "Water",
           value: 66.8
       }]);
   });
   ```

10. **自定义图像**：你可以使用自定义图像创建图表。在 `snsd.js` 中实现以下代码：
    ```javascript
    am5.ready(function () {
        var root = am5.Root.new("chartdiv_snsd");
        var chart = root.container.children.push(
            am5percent.SlicedChart.new(root, {})
        );

        var series = chart.series.push(
            am5percent.PictorialStackedSeries.new(root, {
                svgPath: snsdPath,
                categoryField: "name",
                valueField: "value",
                orientation: "horizontal"
            })
        );

        series.slices.template.setAll({
            tooltipText: "{name} Entertainment: {value} billions KRW."
        });

        series.get("colors").set("colors", [
            am5.color(0xff4980),
            am5.color(0xe9cdc2),
            am5.color(0x773d31),
        ]);

        series.data.setAll([{
            name: "SM",
            value: 365387
        }, {
            name: "JYP",
            value: 102242
        }, {
            name: "YG",
            value: 349861
        }]);
    });
    ```

11. **动态数据**：你可以从数据库中获取动态数据并显示在图表中。在 `routes/index.js` 中添加以下代码：
    ```javascript
    router.get('/snsd', async function (req, res, next) {
        const db = await connectToDB();
        try {
            let avengers = await db.collection("bookings").find({ team: 'Avengers' }).toArray();
            let jla = await db.collection("bookings").find({ team: 'JLA' }).toArray();
            let neither = await db.collection("bookings").find({ team: '' }).toArray();

            res.render('snsd', {
                data: [
                    { name: "Avengers", value: avengers.length },
                    { name: "JLA", value: jla.length },
                    { name: "Neither", value: neither.length }
                ]
            });
        } catch (err) {
            res.status(400).json({ message: err.message });
        } finally {
            await db.client.close();
        }
    });
    ```

12. **提交作业**：将你的工作打包并提交到 BUmoodle。

### 总结
通过这个实验，你将学会如何使用 **amCharts** 创建动态数据可视化，并结合数据库显示实时数据。你可以根据需要自定义地图、图表和工具提示，并将数据动态地从数据库中提取并显示在图表中。
